import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from '../models/user.model.js'
import { body, validationResult } from 'express-validator'
import { sendEmail } from '../services/email.service.js'
import { getCsrfToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// ============ 1. RÈGLES DE VALIDATION ============
const registerValidation = [
    body('name').trim().notEmpty().withMessage('Le nom est requis'),
    body('username').trim().notEmpty().withMessage("L'nom d'utilisateur est requis"),
    body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit faire au moins 8 caractères').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Le mot de passe doit contenir majuscules, minuscules et chiffres'),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Les mots de passe ne correspondent pas');
        }
        return true;
    })
]

// ============ 2. INSCRIPTION (REGISTER) ============
router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
        const { name, username, email, password } = req.body

        // Vérification doublon
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email déjà utilisé' })
        }

        // Création
        const newUser = await User.create({ name, username, email, password })
        const verificationToken = jwt.sign(
            { email: newUser.email }, 
            process.env.JWT_EMAIL_SECRET, 
            { expiresIn: '1h' }
        )
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
        // Envoi email de bienvenue (Non-bloquant)
        sendEmail({
            email: newUser.email,
            subject: 'Alinéa, where stories travel ',
            message: `Welcome ${newUser.name}, you've joined our community! Explore, share, and connect with fellow book lovers. Happy reading!\n\nClick here to verify your account (valid for 1 hour): \n${verificationUrl}`
        }).catch(err => console.error("Erreur email bienvenue:", err.message))

        res.status(201).json({
            success: true,
            message: 'Utilisateur créé. Vous pouvez vous connecter.',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        })
    } catch (error) {
        console.error('Register Error:', error.message)
        // Don't leak sensitive database/validation errors to client
        const message = error.message.includes('E11000') ? 'Cet email ou username est déjà utilisé' : 'Erreur lors de l\'inscription'
        res.status(500).json({ success: false, message, code: 'REGISTRATION_ERROR' })
    }
})

// ============ 3. CONNEXION (LOGIN) ============
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err) {
            console.error('Login Error:', err)
            return res.status(500).json({ success: false, message: 'Erreur serveur lors de la connexion', code: 'LOGIN_ERROR' })
        }
        if (!user) return res.status(401).json({ success: false, message: info.message || 'Identifiants invalides' })

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
})

// ============ 4. RAFRAÎCHIR LE TOKEN (REFRESH) ============
router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ success: false, message: 'Pas de refresh token' })

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            console.error('Refresh Token Error:', err.message)
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return res.status(403).json({ success: false, message: 'Session expirée', code: 'SESSION_EXPIRED' })
        }

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
    })
})

// ============ 5. DÉCONNEXION (LOGOUT) ============
router.post('/logout', (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json({ success: true, message: 'Déconnecté' })
})

// ============ 6. CSRF TOKEN ============
router.get('/csrf-token', (req, res) => {
    const csrfToken = getCsrfToken(req, res);
    res.json({ csrfToken });
})

router.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token manquant' })
        }
        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET ||'CHANGE_ME_generate_with_crypto_randomBytes_32_hex')
        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable'})
        }
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'Compte déjà vérifié' })
        }

        user.isVerified = true
        await user.save()
        return res.json({ success: true, message: 'Votre compte est activé ! Vous pouvez maintenant vous connecter.' })
    } catch (error) {
        console.error('Email Verification Error:', error.message)
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ success: false, message: 'Le lien a expiré. Veuillez demander un nouvel email.', code: 'TOKEN_EXPIRED' })
        }
        const message = error.name === 'JsonWebTokenError' ? 'Token invalide' : 'Erreur lors de la vérification'
        return res.status(400).json({ success: false, message, code: 'VERIFICATION_ERROR' })
    }
})


export default router