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
        /* const error = new Error('Erreur de validation');
        error.statusCode = 400;
        error.errors = errors.array(); // On peut attacher le tableau d'erreurs d'express-validator !
        throw error; */
        console.log("Détails des erreurs :", errors.array()); 
  
  // Renvoie une réponse claire au front-end
  return res.status(400).json({ 
      message: "Erreur de validation", 
      erreurs: errors.array() 
  });
}


    const { name, username, email, password } = req.body

    // Vérification doublon
    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('Email déjà utilisé');
        error.statusCode = 400;
        throw error;
    }

    // Création (Correction du chemin 'public/' comme pour les livres)
    const pdp = req.file ? `/uploads/pdp/${req.file.filename}` : `/uploads/pdp/default-pdp.png`
    const newUser = await User.create({ name, username, email, password, pdp })
    
    const verificationToken = jwt.sign(
        { email: newUser.email }, 
        process.env.JWT_EMAIL_SECRET, 
        { expiresIn: '1h' }
    )
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
    
    // Envoi email de bienvenue (Non-bloquant)
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
    // Exception : On garde 'next' ici car Passport en a besoin en interne.
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err) {
            return next(err); // On passe l'erreur de passport au gestionnaire global
        }
        
        if (!user) {
            return res.status(401).json({ success: false, message: info.message || 'Identifiants invalides' })
        }

        // Génération des TOKENS
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

        // Cookies HttpOnly
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

    // Identique au refresh : ça "throw" tout seul si le lien est expiré
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
        // La récupération devient ultra simple
        const token = req.params.token; 

        console.log("Token reçu pour vérification:", token); // Debug : Affiche le token reçu
        
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token manquant' });
        }

        // Vérification du token
        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        
        // Recherche de l'utilisateur
        const user = await User.findOne({ email: decoded.email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
        }
        
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'Compte déjà vérifié' });
        }

        // Validation du compte
        user.isVerified = true;
        await user.save();
        
        return res.json({ success: true, message: 'Votre compte est activé ! Vous pouvez maintenant vous connecter.' });
        
    } catch (error) {
        console.error('Email Verification Error:', error); // J'ai enlevé .message pour voir TOUTE l'erreur dans la console si ça recrash
        
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
        const user = req.user; // Récupéré depuis la stratégie dans passport.js

        // On génère les mêmes tokens que pour le login classique
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

        // On dépose les cookies 
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

        // Maintenant l'utilisateur arrive au dashboard AVEC ses cookies d'accès
        res.redirect('http://localhost:5173/welcome');
}

// ============ FORGOT PASSWORD ============
export const forgotPass = async (req, res) => {
    const { email } = req.body;

    try {
        // 1. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            // Security: Generic message to prevent email enumeration
            return res.status(404).json({ 
                success: false,
                message: "If an account exists with this email, a reset link has been sent." 
            });
        }

        // 2. Generate the reset token using the instance method we created earlier
        const resetToken = user.getResetPasswordToken();

        // 3. Save the hashed token and expiry to the database
        // We use validateBeforeSave: false to bypass password requirements for this update
        await user.save({ validateBeforeSave: false });

        // 4. Create the reset URL (pointing to your React frontend)
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

        // 5. Craft the email message
        const message = `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the link below to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

        try {
            // 6. Send the email using your existing service
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
            // 7. If email fails, reset the fields in DB to avoid stuck tokens
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
    console.log(error); // Utilise log au lieu de error pour tester
    res.status(500).json({ 
        success: false,
        message: error.message // Renvoie l'erreur réelle à Postman pour le test
    });
}
}

// ============ RESET PASSWORD ============
export const resetPass = async (req, res) => {
    try {
        // 1. Hash the token from the URL to compare it with the DB version
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        // 2. Find user with valid token and check if not expired
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

        // 3. Set new password and clear reset fields
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // 4. Save (the pre-save middleware will hash the new password)
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