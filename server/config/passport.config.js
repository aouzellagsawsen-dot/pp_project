import LocalStrategy from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user.model.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

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
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email }).select('+password')
            
            if (!user) {
                return done(null, false, { message: 'Aucun utilisateur avec cet e-mail' })
            }
            
            const isPasswordValid = await user.comparePassword(password)
            if (isPasswordValid) {
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
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_ACCESS_SECRET,
        passReqToCallback: false
    }
    
    const verifyJwt = async (payload, done) => {
        try {
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
    // ============ GOOGLE STRATEGY ============
    const googleOptions = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }
    const verifyGoogle = async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleID: profile.id })
            if (user) {
                return done(null, user)
            }
            user = await User.create({
                googleID: profile.id,
                username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
                name: profile.displayName,
                email: profile.emails[0].value,
            })

            return done(null, user)
        } catch (error) {
            return done(error)
        }

    }

    passport.use('local', new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.use('jwt', new JWTStrategy(jwtOptions, verifyJwt))
    passport.use('google', new GoogleStrategy(googleOptions, verifyGoogle))
}