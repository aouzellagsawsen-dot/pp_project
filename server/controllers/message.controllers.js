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

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        });
    } else {
        conversation.updatedAt = Date.now();
        await conversation.save();
    }

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
        relatedId: conversation._id,
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

    const conversations = await Conversation.find({
        participants: { $in: [userId] }
    })
    .populate('participants', 'username avatar')
    .sort({ updatedAt: -1 });

    res.status(200).json({
        success: true,
        data: conversations
    });
};

// ============ 3. RÉCUPÉRER LES MESSAGES D'UNE CONVERSATION ============
export const getMessages = async (req, res) => {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({ conversationId: conversationId })
        .populate('sender', 'username avatar')
        .sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        data: messages
    });
};
