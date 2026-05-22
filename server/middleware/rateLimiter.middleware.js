import rateLimit from 'express-rate-limit'

// Global limiter: max 100 requests per 15 minutes per IP
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: { success: false, message: 'Too many requests from this IP, please try again later.' }
})

// Auth limiter: strict limit for logins to prevent password guessing
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' }
})