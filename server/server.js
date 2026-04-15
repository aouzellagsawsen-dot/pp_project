import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { dbConnection } from './config/db.config.js'
import initializePassport from './config/passport.config.js'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import { authLimiter, globalLimiter } from './middleware/rateLimiter.middleware.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import bookRoutes from './routes/book.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import messagingRoutes from './routes/message.routes.js'
import Book from './models/book.model.js'
import User from './models/user.model.js'
import { errorHandler } from './middleware/error.middleware.js'
import { csrfHandler } from './middleware/csrf.middleware.js'

const app = express()
const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ============ BODY PARSER & COOKIE MIDDLEWARE ============
app.use(helmet())
app.use('/api', globalLimiter) // Appliquer le rate limiter global à toutes les routes API
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())
app.set('view engine', 'ejs')

// Rendre le dossier "public" accessible via l'URL du navigateur
app.use('/public', express.static(path.join(__dirname, 'public')))

// ============ DATABASE CONNECTION ============
dbConnection()

// ============ PASSPORT SETUP ============
initializePassport(passport)

// ============ TEST ROUTE =============
app.get('/add-book', (req, res) => {
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
})

app.get('/', (req, res) => {
    res.render('login')
})

// ============ ROUTING ===============
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/notify', notificationRoutes)
app.use('/api/messages', messagingRoutes)

// ============ CSRF ERROR HANDLER ============
app.use(csrfHandler)

// ============ GESTIONNAIRE D'ERREURS GLOBAL ============
// Ce middleware DOIT être le tout dernier avant app.listen()
app.use(errorHandler)
/*app.use((err, req, res, next) => {
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
})*/

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
})