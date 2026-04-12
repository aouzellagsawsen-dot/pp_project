import express from 'express'
import { authenticateToken, protectMutation } from '../middleware/auth.middleware.js';
import { getMyFavorites, toggleFavorite } from '../controllers/favorite.controllers.js';

const router = express.Router()

// Voir mes favoris
router.get('/', authenticateToken, getMyFavorites)

// Ajouter/Retirer (On passe l'ID du livre dans l'URL)
router.post('/toggle/:bookId', protectMutation, toggleFavorite)

export default router;