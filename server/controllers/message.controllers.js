import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import Notification from '../models/notification.model.js';

// ============ 1. ENVOYER UN MESSAGE ============
export const sendMessage = async (req, res) => {
    const { text } = req.body;
    const receiverId = req.params.receiverId; 
    const senderId = req.user.id;

    if (!text) {
        const error = new Error("Le message ne peut pas être vide.");
        error.statusCode = 400;
        throw error;
    }

    // 1. Chercher s'il existe DÉJÀ une conversation
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    // 2. Création ou mise à jour
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        });
    } else {
        conversation.updatedAt = Date.now();
        await conversation.save();
    }

    // 3. Création du message
    const newMessage = await Message.create({
        conversationId: conversation._id,
        sender: senderId,
        text: text
    });

    const shortText = text.length > 50 ? `${text.substring(0, 50)}...` : text;
    
    // 4. Création de la notification (qui va marcher maintenant !)
    await Notification.create({
        recipient: receiverId,
        sender: senderId,
        type: "message",
        relatedId: conversation._id, // 2. 👉 BONUS : On utilise ton schéma à 100% !
        content: `vous a envoyé un message : "${shortText}"`,
        isRead: false
    });

    res.status(201).json({
        success: true,
        message: "Message envoyé avec succès.",
        data: newMessage
    });
};

// ============ 2. RÉCUPÉRER LA BOÎTE DE RÉCEPTION (Les conversations) ============
export const getConversations = async (req, res) => {
    const userId = req.user.id;

    // On cherche toutes les conversations où notre utilisateur est présent
    const conversations = await Conversation.find({
        participants: { $in: [userId] }
    })
    .populate('participants', 'username avatar') // On récupère les infos des participants
    .sort({ updatedAt: -1 }); // On trie de la plus récente à la plus ancienne

    res.status(200).json({
        success: true,
        data: conversations
    });
};

// ============ 3. RÉCUPÉRER LES MESSAGES D'UNE CONVERSATION ============
export const getMessages = async (req, res) => {
    const conversationId = req.params.conversationId;

    // On va chercher tous les messages de cette boîte
    const messages = await Message.find({ conversationId: conversationId })
        .populate('sender', 'username avatar') // Utile pour savoir si la bulle est "envoyée" ou "reçue" côté Front
        .sort({ createdAt: 1 }); // Tri chronologique (le plus vieux en haut, le plus récent en bas)

    res.status(200).json({
        success: true,
        data: messages
    });
};
