import express from 'express';
import { sendMessage, getConversations, getMessages } from '../controllers/message.controllers.js';
import { protectMutation } from '../middleware/auth.middleware.js'; // Ton middleware d'authentification

const router = express.Router();

// Récupérer la liste des conversations (Inbox)
router.get('/conversations', protectMutation, getConversations);

// Récupérer les messages d'une conversation spécifique
router.get('/:conversationId', protectMutation, getMessages);

// Envoyer un message à un utilisateur spécifique (l'ID dans l'URL est celui du destinataire)
router.post('/send/:receiverId', protectMutation, sendMessage);

export default router;