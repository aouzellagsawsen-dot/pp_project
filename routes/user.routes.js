import express from 'express'
import User from '../models/user.model.js'
import { 
    authenticateToken, 
    authorizeOwner, 
    getCsrfToken, 
    protectUserMutation 
} from '../middleware/auth.middleware.js'

const router = express.Router()

// Get current user profile (authentication only)
router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: 'Your profile',
        user: {
            id: req.user.id,
            email: req.user.email
        }
    })
})

// Get specific user profile (authentication + authorization)
router.get('/profile/:userId', authenticateToken, authorizeOwner, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password')
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found',
                code: 'USER_NOT_FOUND'
            })
        }
        res.json({
            success: true,
            message: 'User profile retrieved',
            user: user
        })
    } catch (error) {
        console.error('Get Profile Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération du profil',
            code: 'GET_PROFILE_ERROR'
        })
    }
})

// Update user profile (authentication + authorization + CSRF)
router.put('/profile/:userId', protectUserMutation, async (req, res) => {
    try {
        const { name, email } = req.body
        
        // 1. On cherche l'utilisateur d'abord
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable',
                code: 'USER_NOT_FOUND'
            })
        }

        // 2. Vérification de l'e-mail existant (si un nouvel e-mail est fourni)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email: email })
            if (existingUser) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Cet e-mail est déjà utilisé',
                    code: 'EMAIL_IN_USE'
                })
            }
            user.email = email // On met à jour l'e-mail dans l'objet
        }

        // 3. Mise à jour du nom (si fourni)
        if (name) {
            user.name = name
        }

        // 4. On sauvegarde (C'EST ICI QUE TES VALIDATEURS MONGOOSE S'ACTIVENT !)
        // Si l'e-mail a un mauvais format ou le nom est trop court, une erreur sera levée et ira dans le catch
        const updatedUser = await user.save()

        res.json({
            success: true,
            message: 'Profil mis à jour avec succès',
            user: updatedUser
        })
    } catch (error) {
        // 5. Gestion spécifique des erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Erreur de validation des données",
                errors: error.errors // Renvoie les détails (ex: "Invalid email format")
            })
        }

        console.error('Update Profile Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la mise à jour du profil',
            code: 'UPDATE_PROFILE_ERROR'
        })
    }
})

export default router