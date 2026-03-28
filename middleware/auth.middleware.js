import jwt from 'jsonwebtoken'
import { doubleCsrf,  } from 'csrf-csrf'

// ============ CSRF PROTECTION ============
const {
    generateToken, 
    doubleCsrfProtection, 
} = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,
    cookieName: "x-csrf-token", 
    cookieOptions: {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    },
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"], 
    getTokenFromRequest: (req) => req.headers["x-csrf-token"], 
})

// ============ AUTHENTICATION ============
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Aucun token fourni. Veuillez vous connecter.',
            code: 'NO_TOKEN'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        // On attache l'utilisateur à la requête
        req.user = { 
            id: decoded.userId, 
            email: decoded.email 
        }
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ 
                success: false,
                message: 'Token expiré. Veuillez rafraîchir.',
                code: 'TOKEN_EXPIRED'
            })
        }
        return res.status(403).json({ 
            success: false,
            message: 'Token invalide',
            code: 'INVALID_TOKEN'
        })
    }
}

// ============ AUTHORIZATION ============
export const authorizeOwner = (req, res, next) => {
    // Security check: user must be authenticated
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Non authentifié', code: 'NOT_AUTHENTICATED' })
    }

    const requestedUserId = req.params.userId || req.body.userId
    const loggedInUserId = req.user.id.toString()

    // Validate that requestedUserId is provided and matches logged-in user
    if (!requestedUserId) {
        return res.status(400).json({ 
            success: false,
            message: 'User ID manquant',
            code: 'MISSING_USER_ID'
        })
    }

    if (requestedUserId !== loggedInUserId) {
        return res.status(403).json({ 
            success: false,
            message: 'Accès refusé : vous ne pouvez modifier que vos propres données',
            code: 'FORBIDDEN_RESOURCE'
        })
    }

    next()
}

// ============ EXPORTS CSRF ============
export const csrfCheck = doubleCsrfProtection
export const getCsrfToken = generateToken

// ============ COMBINED MIDDLEWARE ============
export const protectUserRoute = [authenticateToken, authorizeOwner]
export const protectMutation = [authenticateToken, csrfCheck]
export const protectUserMutation = [authenticateToken, authorizeOwner, csrfCheck]