import express from 'express'
import { uploadPdp } from '../middleware/upload.middleware.js'
import { csrfCode, forgotPass, googleAuth, googleCall, login, logout, refreshToken, register, registerValidation, resetPass, validEmail, verifyEmail } from '../controllers/auth.controllers.js'
import passport from 'passport'

const router = express.Router()

// ============ INSCRIPTION (REGISTER) ============
router.post('/register', uploadPdp.single('profilePicture'), registerValidation, register) // y

// ============ CONNEXION (LOGIN) ============
router.post('/login', login) // y

// ============ RAFRAÎCHIR LE TOKEN (REFRESH) ============
router.post('/refresh', refreshToken) // y

// ============ DÉCONNEXION (LOGOUT) ============
router.post('/logout', logout) // y

// ============ CSRF TOKEN ============
router.get('/csrf-token', csrfCode) // y

router.post('/verify-email', verifyEmail) // y

router.get('/verify-email/:token', validEmail) // n

// ============ AUTHENTIFICATION GOOGLE (OAUTH2) ============
router.get('/google', googleAuth) // y

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCall) // y

// ============ FORGOT PASSWORD ============
router.post('/forgotpassword', forgotPass) // y

// ============ RESET PASSWORD ============
router.put('/resetpassword/:token', resetPass) // y

export default router