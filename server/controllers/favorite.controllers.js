import User from '../models/user.model.js';

// ============ AJOUTER ou RETIRER un favori (Système de Toggle) ============
export const toggleFavorite = async (req, res) => {
    const userId = req.user.id; // Récupéré via ton middleware authenticateToken
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // On vérifie si le livre est déjà dans les favoris
    const isFavorite = user.favorites.includes(bookId);

    if (isFavorite) {
        // S'il y est, on le retire ($pull)
        await User.findByIdAndUpdate(userId, { $pull: { favorites: bookId } });
        return res.status(200).json({ success: true, message: "Retiré des favoris", action: "removed" });
    } else {
        // S'il n'y est pas, on l'ajoute ($addToSet évite les doublons par sécurité)
        await User.findByIdAndUpdate(userId, { $addToSet: { favorites: bookId } });
        return res.status(200).json({ success: true, message: "Ajouté aux favoris", action: "added" });
    }
}

// ============ RÉCUPÉRER la liste des favoris ============
export const getMyFavorites = async (req, res) => {
    const userId = req.user.id;

    // .populate('favorites') transforme les IDs en objets complets (Titre, Auteur, Image...)
    const user = await User.findById(userId).populate('favorites');

    return res.status(200).json({ 
        success: true, 
        favorites: user.favorites 
    });
}