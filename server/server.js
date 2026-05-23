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
import bookRoutes from './routes/book.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import messagingRoutes from './routes/message.routes.js'
import loanRoutes from './routes/loan.routes.js'
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
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())

// ============ FICHIERS STATIQUES ============
app.use(express.static(path.join(__dirname, 'public')))

// ============ DATABASE CONNECTION ============
dbConnection()

// ============ PASSPORT SETUP ============
initializePassport(passport)

// ============ ROUTING ===============
app.use('/api/auth',authLimiter, authRoutes)
app.use('/api/users', globalLimiter, userRoutes)
app.use('/api/books',globalLimiter, bookRoutes)
app.use('/api/favorites', globalLimiter, favoriteRoutes)
app.use('/api/notify', globalLimiter, notificationRoutes)
app.use('/api/messages', globalLimiter, messagingRoutes)
app.use('/api/loans', globalLimiter, loanRoutes)

const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

io.on('connection', (socket) => {
    
    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
    });
    
});

// ============ ERROR HANDLERS  ============
app.use(csrfHandler)
app.use(errorHandler)

// ============ START SERVER ============
server.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
})