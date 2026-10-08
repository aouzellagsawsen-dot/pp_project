import express from 'express'
import { authenticateToken, authorizeOwner, protectUserMutation } from '../middleware/auth.middleware.js'
import { getCurrentProfile, getUserProfile, updateUserProfile, searchUsers } from '../controllers/user.controllers.js'

const router = express.Router()

// Get current user profile (authentication only)
router.get('/profile', authenticateToken, getCurrentProfile)

// Get specific user profile (authentication + authorization)
router.get('/profile/:userId', authenticateToken, authorizeOwner, getUserProfile)

// Update user profile (authentication + authorization + CSRF)
router.patch('/profile/:userId', protectUserMutation, updateUserProfile)

// Search users 
router.get('/search', searchUsers)

export default router