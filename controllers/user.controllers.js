import User from '../models/user.model.js'

// ============ GET CURRENT USER PROFILE ============
export const getCurrentProfile = (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Votre profil',
            user: {
                id: req.user.id,
                email: req.user.email
            }
        })
    } catch (error) {
        console.error('Get Current Profile Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération du profil',
            code: 'GET_PROFILE_ERROR'
        })
    }
}

// ============ GET SPECIFIC USER PROFILE ============
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password')
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Utilisateur introuvable',
                code: 'USER_NOT_FOUND'
            })
        }
        res.json({
            success: true,
            message: 'Profil utilisateur récupéré',
            user: user
        })
    } catch (error) {
        console.error('Get User Profile Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération du profil',
            code: 'GET_PROFILE_ERROR'
        })
    }
}

// ============ UPDATE USER PROFILE ============
export const updateUserProfile = async (req, res) => {
    try {
        const { name, email, username } = req.body
        
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
            user.email = email
        }

        // 3. Vérification du username (si un nouveau username est fourni)
        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username: username })
            if (existingUsername) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Ce username est déjà utilisé',
                    code: 'USERNAME_IN_USE'
                })
            }
            user.username = username
        }

        // 4. Mise à jour du nom (si fourni)
        if (name) {
            user.name = name
        }

        // 5. On sauvegarde (C'EST ICI QUE TES VALIDATEURS MONGOOSE S'ACTIVENT !)
        const updatedUser = await user.save()

        res.json({
            success: true,
            message: 'Profil mis à jour avec succès',
            user: updatedUser
        })
    } catch (error) {
        // Gestion spécifique des erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error.message)
            return res.status(400).json({
                success: false,
                message: "Erreur de validation des données",
                errors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message
                })),
                code: 'VALIDATION_ERROR'
            })
        }

        console.error('Update Profile Error:', error.message)
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la mise à jour du profil',
            code: 'UPDATE_PROFILE_ERROR'
        })
    }
}
