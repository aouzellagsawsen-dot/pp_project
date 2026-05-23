import Notification from '../models/notification.model.js'

// Récupérer les notifications de l'utilisateur connecté
export const getNotifications = async (req, res) => { 
    const userId = req.user.id;

    const notifications = await Notification.find({ recipient: userId })
        .populate('sender', 'username avatar')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: notifications
    });
} 

// Marquer une notification comme lue
export const markAsRead = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOneAndUpdate(
        { _id: id, recipient: userId },
        { isRead: true },
        { new: true }
    );

    if (!notification) {
       
        const error = new Error("Notification not found.");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ success: true, message: "Marqued as read" });
}

// Marquer TOUTES les notifications comme lues
export const markAllAsRead = async (req, res) => {
    const userId = req.user.id;

    await Notification.updateMany(
        { recipient: userId, isRead: false },
        { $set: { isRead: true } }
    );

    res.status(200).json({ 
        success: true, 
        message: "All notifications marked as read." 
    });
}