import express from 'express'
import { uploadPdp } from '../middleware/upload.middleware.js'
import { csrfCode, login, logout, refreshToken, register, registerValidation, verifyEmail } from '../controllers/auth.controllers.js'
import crypto from 'crypto'
import passport from 'passport'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../services/email.service.js'

const router = express.Router()

// ============ INSCRIPTION (REGISTER) ============
router.post('/register', uploadPdp.single('profilePicture'), registerValidation, register)

// ============ CONNEXION (LOGIN) ============
router.post('/login', login)

// ============ RAFRAÎCHIR LE TOKEN (REFRESH) ============
router.post('/refresh', refreshToken)

// ============ DÉCONNEXION (LOGOUT) ============
router.post('/logout', logout)

// ============ CSRF TOKEN ============
router.get('/csrf-token', csrfCode)

router.post('/verify-email', verifyEmail)

/* router.get('/verify-email/:token', async (req, res) => {
    try {
        // La récupération devient ultra simple
        const token = req.params.token; 

        console.log("Token reçu pour vérification:", token); // Debug : Affiche le token reçu
        
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token manquant' });
        }

        // Vérification du token
        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET || 'CHANGE_ME_generate_with_crypto_randomBytes_32_hex');
        
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
}) */
// ============ 7. AUTHENTIFICATION GOOGLE (OAUTH2) ============

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
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
        res.redirect('http://localhost:5173/dashboard');
    }
);


// ============ 8. FORGOT PASSWORD ============
router.post('/forgotpassword', async (req, res) => {
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
});

router.put('/resetpassword/:token', async (req, res) => {
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
});

export default router