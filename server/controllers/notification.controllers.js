import Notification from '../models/notification.model.js'

// Récupérer les notifications de l'utilisateur connecté
export const getNotifications = async (req, res) => { 
    const userId = req.user.id;

    const notifications = await Notification.find({ recipient: userId })
        .populate('sender', 'username avatar') // On donne juste le nom et l'image du sender au front
        .sort({ createdAt: -1 }); // Les plus récentes en premier

    res.status(200).json({
        success: true,
        data: notifications
    });
} // Plus de try/catch ! Si la base de données plante, Express l'envoie au errorHandler.


// Marquer une notification comme lue
export const markAsRead = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndUpdate(
        { _id: id, recipient: userId }, // Sécurité : on vérifie que c'est bien la sienne
        { isRead: true },
        { new: true }
    );

    if (!notification) {
       
        const error = new Error("Notification introuvable.");
        error.statusCode = 404;
        throw error; // Attrapé instantanément par Express 5
    }

    res.status(200).json({ success: true, message: "Marquée comme lue" });
} // Pareil, plus de try/catch en bas !