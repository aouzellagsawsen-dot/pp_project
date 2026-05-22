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
}