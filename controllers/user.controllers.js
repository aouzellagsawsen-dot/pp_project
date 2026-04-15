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
}

// ============ UPDATE USER PROFILE ============
export const updateUserProfile = async (req, res) => {
    try {
        const { name, email, username, pdp } = req.body
        
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable',
                code: 'USER_NOT_FOUND'
            })
        }

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

        if (name) user.name = name
        if (pdp) user.pdp = pdp

        const updatedUser = await user.save()

        res.json({
            success: true,
            message: 'Profil mis à jour avec succès',
            user: updatedUser
        })
        
    } catch (error) {
        // On garde le try/catch UNIQUEMENT pour intercepter et formater 
        // joliment l'erreur spécifique de validation de Mongoose
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

        // 🔥 LA MAGIE D'EXPRESS 5 : 
        // Au lieu de faire next(error), on "jette" simplement l'erreur.
        // Express 5 va l'attraper au vol et l'envoyer à ton errorHandler global !
        throw error
    }
}