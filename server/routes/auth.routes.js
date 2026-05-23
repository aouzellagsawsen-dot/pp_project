import express from 'express'
import { uploadPdp } from '../middleware/upload.middleware.js'
import { csrfCode, forgotPass, getMe, googleAuth, googleCall, login, logout, refreshToken, register, registerValidation, resetPass, validEmail, verifyEmail } from '../controllers/auth.controllers.js'
import passport from 'passport'

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

router.get('/verify-email/:token', validEmail)

// ============ AUTHENTIFICATION GOOGLE (OAUTH2) ============
router.get('/google', googleAuth)

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCall)

// ============ FORGOT PASSWORD ============
router.post('/forgotpassword', forgotPass)

// ============ RESET PASSWORD ============
router.put('/resetpassword/:token', resetPass)

// ============ GET CURRENT USER INFO ============
router.get('/me', getMe)

export default router