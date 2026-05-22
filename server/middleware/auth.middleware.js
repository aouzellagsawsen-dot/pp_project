import jwt from 'jsonwebtoken'
import { doubleCsrf } from 'csrf-csrf'

// ============ CSRF PROTECTION ============
const { generateCsrfToken, doubleCsrfProtection, } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET,
    cookieName: "x-csrf-token", 
    getSessionIdentifier: (req) => req.cookies?.accessToken || "utilisateur_non_connecte",
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
        const error = new Error('Aucun token fourni. Veuillez vous connecter.')
        error.statusCode = 401
        error.code = 'NO_TOKEN'
        throw error
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    
    req.user = { 
        id: decoded.userId, 
        email: decoded.email 
    }
    
    next()
}

// ============ AUTHORIZATION ============
export const authorizeOwner = (req, res, next) => {
    if (!req.user) {
        const error = new Error('Non authentifié')
        error.statusCode = 401
        error.code = 'NOT_AUTHENTICATED'
        throw error
    }

    const requestedUserId = req.params.userId || req.body.userId
    const loggedInUserId = req.user.id.toString()

    if (!requestedUserId) {
        const error = new Error('User ID manquant')
        error.statusCode = 400
        error.code = 'MISSING_USER_ID'
        throw error
    }

    if (requestedUserId !== loggedInUserId) {
        const error = new Error('Accès refusé : vous ne pouvez modifier que vos propres données')
        error.statusCode = 403
        error.code = 'FORBIDDEN_RESOURCE'
        throw error
    }

    next()
}

// ============ EXPORTS CSRF ============
export const csrfCheck = doubleCsrfProtection
export const getCsrfToken = generateCsrfToken

// ============ COMBINED MIDDLEWARE ============
export const protectUserRoute = [authenticateToken, authorizeOwner]
export const protectMutation = [authenticateToken, csrfCheck]
export const protectUserMutation = [authenticateToken, authorizeOwner, csrfCheck]