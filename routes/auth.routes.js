import express from 'express'
import { uploadPdp } from '../middleware/upload.middleware.js'
import { csrfCode, login, logout, refreshToken, register, registerValidation, verifyEmail } from '../controllers/auth.controllers.js'

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

export default router