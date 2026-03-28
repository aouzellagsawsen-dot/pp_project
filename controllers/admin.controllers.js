import User from '../models/user.model.js'

// ============ DELETE USER ACCOUNT ============
export const deleteAccount = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId)
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable',
                code: 'USER_NOT_FOUND'
            })
        }
        
        // Clear all authentication cookies
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        
        res.json({ 
            success: true,
            message: 'Compte supprimé avec succès',
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
}

// ============ GET ALL USERS (ADMIN ONLY) ============
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json({
            success: true,
            message: 'Tous les utilisateurs récupérés (accès admin uniquement)',
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
}

// ============ DELETE USER (ADMIN ONLY) ============
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        
        // Additional security check
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID manquant',
                code: 'MISSING_USER_ID'
            })
        }

        const deletedUser = await User.findByIdAndDelete(userId)
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable',
                code: 'USER_NOT_FOUND'
            })
        }
        
        res.json({ 
            success: true,
            message: 'Utilisateur supprimé avec succès par l\'admin',
            user: { id: deletedUser._id, email: deletedUser.email },
            code: 'USER_DELETED'
        })
    } catch (error) {
        console.error('Delete User (Admin) Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la suppression de l\'utilisateur',
            code: 'DELETE_USER_ERROR'
        })
    }
}
