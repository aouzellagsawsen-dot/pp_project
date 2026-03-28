import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { sendEmail } from '../services/email.service.js'

// ============ REGISTER CONTROLLER ============
export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        // Vérification doublon
        const userExists = await User.findOne({ $or: [{ email }, { username }] })
        if (userExists) {
            const field = userExists.email === email ? 'Email' : 'Username'
            return res.status(400).json({ 
                success: false, 
                message: `${field} déjà utilisé`,
                code: 'DUPLICATE_USER'
            })
        }

        // Création
        const newUser = await User.create({ name, username, email, password })
        
        // Génération du token de vérification
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
            message: 'Utilisateur créé. Vérifiez votre email pour activer votre compte.',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        })
    } catch (error) {
        console.error('Register Error:', error.message)
        // Don't leak sensitive database/validation errors to client
        const message = error.message.includes('E11000') ? 'Cet email ou username est déjà utilisé' : 'Erreur lors de l\'inscription'
        res.status(500).json({ success: false, message, code: 'REGISTRATION_ERROR' })
    }
}

// ============ LOGIN CONTROLLER ============
export const login = async (req, res) => {
    // This is handled by passport middleware, controller is a placeholder for consistency
    try {
        const { user } = req
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Authentification échouée', code: 'AUTH_FAILED' })
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

        res.json({ 
            success: true, 
            message: 'Connecté avec succès',
            user: { id: user._id, name: user.name, email: user.email } 
        })
    } catch (error) {
        console.error('Login Controller Error:', error.message)
        res.status(500).json({ success: false, message: 'Erreur lors de la connexion', code: 'LOGIN_ERROR' })
    }
}

// ============ REFRESH TOKEN CONTROLLER ============
export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) {
        return res.status(401).json({ success: false, message: 'Pas de refresh token', code: 'NO_REFRESH_TOKEN' })
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
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
}

// ============ LOGOUT CONTROLLER ============
export const logout = (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json({ success: true, message: 'Déconnecté avec succès' })
}

// ============ VERIFY EMAIL CONTROLLER ============
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token manquant', code: 'MISSING_TOKEN' })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET)
        const user = await User.findOne({ email: decoded.email })
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable', code: 'USER_NOT_FOUND' })
        }
        
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'Compte déjà vérifié', code: 'ALREADY_VERIFIED' })
        }

        user.isVerified = true
        await user.save()
        
        res.json({ 
            success: true, 
            message: 'Votre compte est activé ! Vous pouvez maintenant vous connecter.',
            code: 'EMAIL_VERIFIED'
        })
    } catch (error) {
        console.error('Email Verification Error:', error.message)
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ success: false, message: 'Le lien a expiré. Veuillez demander un nouvel email.', code: 'TOKEN_EXPIRED' })
        }
        const message = error.name === 'JsonWebTokenError' ? 'Token invalide' : 'Erreur lors de la vérification'
        res.status(400).json({ success: false, message, code: 'VERIFICATION_ERROR' })
    }
}
