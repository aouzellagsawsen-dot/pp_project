import User from '../models/user.model.js'

// ============ GET CURRENT USER PROFILE ============
export const getCurrentProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')

    res.json({
        success: true,
        message: 'Votre profil',
        user: {
            name: user.name,
            email: user.email,
            bio: user.bio
        }
    })
}

// ============ GET SPECIFIC USER PROFILE ============
export const getUserProfile = async (req, res) => {
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
}

// ============ UPDATE USER PROFILE ============
export const updateUserProfile = async (req, res) => {
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
}

 // ========== SEARCH USERS ============
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query

    if (!q || q.trim() === '') {
      return res.status(200).json([]);
    }

    /* const searchRegex = { $regex: q, $options: 'i' };
    
    const users = await User.find({
      $or: [
        { name: searchRegex },
        { username: searchRegex },
        { email: searchRegex }
      ]
    })
    .select('name username pdp bio') 
    .limit(20);
*/

    const users = await User.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: q,
            path: ["name", "username", "email"],
            fuzzy: { maxEdits: 1 }
          }
        }
      },
      { $limit: 20 },
      { 
        $project: { 
          name: 1, 
          username: 1, 
          pdp: 1, 
          bio: 1 
        } 
      }
    ])

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche", error: error.message });
  }
}