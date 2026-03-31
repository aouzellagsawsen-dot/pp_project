import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './passport.js'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import { authLimiter, globalLimiter } from './middleware/rateLimiter.middleware.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import bookRoutes from './routes/book.routes.js'
import Book from './models/book.model.js'
import User from './models/user.model.js'

const app = express()
const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine' , 'ejs')

// Rendre le dossier "public" accessible via l'URL du navigateur
app.use('/public', express.static(path.join(__dirname, 'public')))

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


// ============ TEST ROUTE =============

/* app.get('/add-book', (req, res) => {
    res.render('add-book')
})

app.get('/book-list', async (req, res, next) => {
    try {
        // On demande à MongoDB d'aller chercher tous les livres
        const myBooks = await Book.find(); 
        
        // On affiche la page ET on lui donne la valise "books" remplie !
        res.render('book-list', { books: myBooks }); 
    } catch (error) {
        next(error); // Envoie l'erreur à ton super gestionnaire d'erreurs global
    }
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/users', async (req, res, next) => {
    try {
        // On demande à MongoDB d'aller chercher tous les livres
        const myUsers = await User.find(); 
        
        // On affiche la page ET on lui donne la valise "books" remplie !
        res.render('users', { users: myUsers }); 
    } catch (error) {
        next(error); // Envoie l'erreur à ton super gestionnaire d'erreurs global
    }
}) */

// ============ ROUTING ===============
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/books', bookRoutes)


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
app.use((err, req, res, next) => {
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
})

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
})