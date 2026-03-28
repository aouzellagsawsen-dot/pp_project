import LocalStrategy from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import User from './models/user.model.js'

// ============ CUSTOM COOKIE EXTRACTOR ============
const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies.accessToken
    }
    return token
}

export default function initializePassport(passport) {
    // ============ LOCAL STRATEGY ============
    // Utilisée uniquement pour le /api/login
    const authenticateUser = async (email, password, done) => {
        try {
            // AJOUT CRITIQUE : .select('+password')
            const user = await User.findOne({ email: email }).select('+password')
            
            if (!user) {
                return done(null, false, { message: 'Aucun utilisateur avec cet e-mail' })
            }
            
            const isPasswordValid = await user.comparePassword(password)
            if (isPasswordValid) {
                // On s'assure de ne pas renvoyer le mot de passe dans l'objet 'user' à la suite du code
                user.password = undefined 
                return done(null, user)
            } else {
                return done(null, false, { message: 'Mot de passe incorrect' })
            }
        } catch (error) {
            return done(error)
        }
    }

    // ============ JWT STRATEGY (STATELESS) ============
    // Utilisée pour protéger tes routes via /middleware/auth.middleware.js
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_ACCESS_SECRET, // Sécurité : pas de fallback !
        passReqToCallback: false
    }
    
    const verifyJwt = async (payload, done) => {
        try {
            // Requête BDD optionnelle mais recommandée pour vérifier si l'user existe toujours
            const user = await User.findById(payload.userId)
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error)
        }
    }

    // Enregistrement des stratégies
    passport.use('local', new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.use('jwt', new JWTStrategy(jwtOptions, verifyJwt))

}