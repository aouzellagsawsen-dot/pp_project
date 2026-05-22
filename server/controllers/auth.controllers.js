import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { sendEmail } from '../services/email.service.js'
import { body, validationResult } from 'express-validator'
import passport from 'passport'
import { getCsrfToken } from '../middleware/auth.middleware.js'
import crypto from 'crypto'

// ============ RÈGLES DE VALIDATION ============
export const registerValidation = [
    body('name').trim().notEmpty().withMessage('Le nom est requis'),
    body('username').trim().notEmpty().withMessage("L'nom d'utilisateur est requis"),
    body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit faire au moins 8 caractères').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Le mot de passe doit contenir majuscules, minuscules et chiffres'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Les mots de passe ne correspondent pas');
        }
        return true;
    })
]

// ============ REGISTER CONTROLLER ============
export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log("Détails des erreurs :", errors.array()); 
  return res.status(400).json({ 
      message: "Erreur de validation", 
      erreurs: errors.array() 
  });
}

    const { name, username, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('Email déjà utilisé');
        error.statusCode = 400;
        throw error;
    }

    const pdp = req.file ? `/uploads/pdp/${req.file.filename}` : `/uploads/pdp/default-pdp.png`
    const newUser = await User.create({ name, username, email, password, pdp })
    
    const verificationToken = jwt.sign(
        { email: newUser.email }, 
        process.env.JWT_EMAIL_SECRET, 
        { expiresIn: '1h' }
    )
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`

    sendEmail({
        email: newUser.email,
        subject: 'Alinéa, where stories travel',
        message: `Welcome ${newUser.name}, you've joined our community! Explore, share, and connect with fellow book lovers. Happy reading!\n\nClick here to verify your account (valid for 1 hour): \n${verificationUrl}`
    }).catch(err => console.error("Erreur email bienvenue:", err.message))

    res.status(201).json({
        success: true,
        message: 'Utilisateur créé. Vous pouvez vous connecter.',
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
    })
}

// ============ LOGIN CONTROLLER ============
export const login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.status(401).json({ success: false, message: info.message || 'Identifiants invalides' })
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_ACCESS_SECRET, 
            { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ success: true, user: { id: user._id, name: user.name } })
    })(req, res, next)
}

// ============ REFRESH TOKEN CONTROLLER ============
export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken
    
    if (!token) {
        const error = new Error('Pas de refresh token');
        error.statusCode = 401;
        throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email }, 
        process.env.JWT_ACCESS_SECRET, 
        { expiresIn: '15m' }
    )

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    })

    res.json({ success: true, message: 'Token rafraîchi' })
}

// ============ LOGOUT CONTROLLER ============
export const logout = (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json({ success: true, message: 'Déconnecté' })
}

// ============ VERIFY EMAIL CONTROLLER ============
export const verifyEmail = async (req, res) => {
    const { token } = req.body
    if (!token) {
        const error = new Error('Token manquant');
        error.statusCode = 400;
        throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET)
    
    const user = await User.findOne({ email: decoded.email })
    
    if (!user) {
        const error = new Error('Utilisateur introuvable');
        error.statusCode = 404;
        throw error;
    }
    
    if (user.isVerified) {
        const error = new Error('Compte déjà vérifié');
        error.statusCode = 400;
        throw error;
    }

    user.isVerified = true
    await user.save()
    return res.json({ success: true, message: 'Votre compte est activé ! Vous pouvez maintenant vous connecter.' })
}

export const validEmail = async (req, res) => {
    try {
        const token = req.params.token; 

        console.log("Token reçu pour vérification:", token);
        
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token manquant' });
        }

        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);

        const user = await User.findOne({ email: decoded.email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
        }
        
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'Compte déjà vérifié' });
        }

        user.isVerified = true;
        await user.save();
        
        return res.json({ success: true, message: 'Votre compte est activé ! Vous pouvez maintenant vous connecter.' });
        
    } catch (error) {
        console.error('Email Verification Error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ success: false, message: 'Le lien a expiré. Veuillez demander un nouvel email.', code: 'TOKEN_EXPIRED' });
        }
        
        const message = error.name === 'JsonWebTokenError' ? 'Token invalide' : 'Erreur lors de la vérification';
        return res.status(400).json({ success: false, message, code: 'VERIFICATION_ERROR' });
    }
}
// ============ AUTHENTIFICATION GOOGLE (OAUTH2) ============

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
})

export const googleCall = (req, res) => {
        const user = req.user;

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_ACCESS_SECRET, 
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.redirect('http://localhost:5173/welcome');
}

// ============ FORGOT PASSWORD ============
export const forgotPass = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({ 
                success: false,
                message: "If an account exists with this email, a reset link has been sent." 
            });
        }

        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/ResetPassword/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the link below to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

        try {

            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request - Alinéa',
                message: message
            });

            res.status(200).json({ 
                success: true, 
                message: "Email sent successfully." 
            });

        } catch (mailError) {

            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });

            console.error("Mail service error:", mailError);
            return res.status(500).json({ 
                success: false,
                message: "Email could not be sent. Please try again later." 
            });
        }

    } catch (error) {
    console.log("------- ERREUR DETECTEE ICI -------");
    console.log(error);
    res.status(500).json({ 
        success: false,
        message: error.message
    });
}
}

// ============ RESET PASSWORD ============
export const resetPass = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired token." 
            });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Password reset successful!" 
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
}

// ============ CSRF TOKEN ============
export const csrfCode = (req, res) => {
    const csrfToken = getCsrfToken(req, res)
    res.json({ csrfToken })
}