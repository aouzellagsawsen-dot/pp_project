import 'dotenv/config'
import express from 'express'
import cors from 'cors'
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
import { errorHandler } from './middleware/error.middleware.js'
import { csrfHandler } from './middleware/csrf.middleware.js'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ============ CORS CONFIGURATION ============
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ============ SECURITY & MIDDLEWARES ============
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })) 

app.use('/api', globalLimiter)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())

// ============ FICHIERS STATIQUES ============
app.use(express.static(path.join(__dirname, 'public')))

// ============ DATABASE CONNECTION ============
dbConnection()

// ============ PASSPORT SETUP ============
initializePassport(passport)

// ============ ROUTING ===============
app.use('/api/auth', authRoutes) // faut ajouter authLimiter apres 
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/notify', notificationRoutes)
app.use('/api/messages', messagingRoutes)

const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log(`⚡ Utilisateur connecté : ${socket.id}`)

    socket.onAny((eventName, ...args) => {
        console.log(`[DEBUG] Le serveur a reçu l'événement exact : "${eventName}"`, args)
    })

    socket.on('sendMessage', (data) => {
        console.log(`Message de ${data.pseudo} :`, data.text)
        socket.broadcast.emit('receiveMessage', data)
    })

    socket.on('disconnect', () => {
        console.log(`❌ Utilisateur déconnecté : ${socket.id}`)
    })
})

// ============ ERROR HANDLERS (Toujours à la fin !) ============
app.use(csrfHandler)
app.use(errorHandler)

// ============ START SERVER ============
server.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
})