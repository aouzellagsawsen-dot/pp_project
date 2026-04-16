import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { sendEmail } from '../services/email.service.js'
import { body, validationResult } from 'express-validator'
import passport from 'passport'
import { getCsrfToken } from '../middleware/auth.middleware.js'

// ============ RÈGLES DE VALIDATION ============
export const registerValidation = [
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

// ============ REGISTER CONTROLLER ============
export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Erreur de validation');
        error.statusCode = 400;
        error.errors = errors.array(); // On peut attacher le tableau d'erreurs d'express-validator !
        throw error;
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
export const refreshToken = async (req, res) => { // Plus de callback complexe !
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
export const verifyEmail = async (req, res) => { // Plus de try/catch !
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

// ============ CSRF TOKEN ============
export const csrfCode = (req, res) => {
    const csrfToken = getCsrfToken(req, res)
    res.json({ csrfToken })
}