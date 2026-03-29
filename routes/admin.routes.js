import express from 'express'
import { authenticateToken, protectUserMutation } from '../middleware/auth.middleware.js'
import User from '../models/user.model.js'
const router = express.Router()

// Delete user account
router.delete('/profile/:userId', protectUserMutation, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        
        // Clear all authentication cookies
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        
        res.json({ 
            success: true,
            message: 'Account deleted successfully',
            code: 'ACCOUNT_DELETED'
        })
    } catch (error) {
        console.error('Delete Account Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la suppression du compte',
            code: 'DELETE_ACCOUNT_ERROR'
        })
    }
})

// List all users
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json({
            success: true,
            message: 'All users retrieved (authenticated access only)',
            count: users.length,
            users: users
        })
    } catch (error) {
        console.error('Get Users Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des utilisateurs',
            code: 'GET_USERS_ERROR'
        })
    }
})

export default router