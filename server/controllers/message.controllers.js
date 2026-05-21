import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

// ============ 1. ENVOYER UN MESSAGE ============
export const sendMessage = async (req, res) => {
    const { text } = req.body;
    const receiverId = req.params.receiverId; 
    const senderId = req.user.id;

    if (!text) {
        const error = new Error("Le message ne peut pas être vide.");
        error.statusCode = 400;
        throw error; // Express 5 attrape et envoie ça au errorHandler global
    }

    // 1. Chercher s'il existe DÉJÀ une conversation entre ces deux utilisateurs
    // L'opérateur $all de MongoDB vérifie que le tableau contient bien ces deux IDs
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    // 2. S'il n'y en a pas, on crée la "boîte" de conversation
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        });
    } else {
        // Petite astuce : on met à jour la date de la conversation pour qu'elle remonte 
        // tout en haut de la boîte de réception côté Front !
        conversation.updatedAt = Date.now();
        await conversation.save();
    }

    // 3. On crée le message et on le lie à la conversation
    const newMessage = await Message.create({
        conversationId: conversation._id,
        sender: senderId,
        text: text
    });

    const shortText = text.length > 50 ? `${text.substring(0, 50)}...` : text;
    
    await Notification.create({
        recipient: receiverId,
        sender: senderId,
        type: "message",
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