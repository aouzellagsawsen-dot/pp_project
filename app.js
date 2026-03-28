import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './passport.js'
import helmet from 'helmet'
import { authLimiter, globalLimiter } from './middleware/rateLimiter.middleware.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT

// ============ BODY PARSER & COOKIE MIDDLEWARE ============
app.use(helmet())

app.use('/api', globalLimiter) // Appliquer le rate limiter global à toutes les routes API
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())

// ============ DATABASE CONNECTION ============
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✓ MongoDB connected'))
    .catch(err => {
        console.error('✗ MongoDB connection error:', err)
        process.exit(1)
    })

// ============ PASSPORT SETUP ============
initializePassport(passport)

// ============ ROUTING ===============
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

// ============ CSRF ERROR HANDLER ============
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            success: false,
            message: "Le jeton CSRF est invalide ou absent. Vérifiez l'en-tête X-CSRF-Token.",
            code: 'INVALID_CSRF'
        });
    }
    next(err);
})

// ============ GESTIONNAIRE D'ERREURS GLOBAL ============
// Ce middleware DOIT être le tout dernier avant app.listen()
app.use((err, req, res) => {
    // 1. On loggue l'erreur complète dans le terminal pour le développeur
    console.error('ERREUR SERVEUR :', err.stack);

    // 2. On détermine le code HTTP (500 par défaut si non spécifié)
    const statusCode = err.status || err.statusCode || 500;

    // 3. On renvoie une réponse JSON toujours propre et structurée
    res.status(statusCode).json({
        success: false,
        // En mode développement, on affiche le vrai message d'erreur.
        // En mode production, on cache les détails et on met un message générique.
        message: process.env.NODE_ENV === 'production' 
            ? 'Une erreur interne est survenue.' 
            : err.message,
        code: err.code || 'SERVER_ERROR'
    });
});
// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
})