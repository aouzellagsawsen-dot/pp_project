import express from 'express'
import { authenticateToken, protectUserMutation } from '../middleware/auth.middleware.js'
import { deleteAccount, getAllUsers } from '../controllers/admin.controllers.js'
const router = express.Router()

// Delete user account
router.delete('/profile/:userId', protectUserMutation, deleteAccount )

// List all users
router.get('/users', authenticateToken, getAllUsers)

export default router