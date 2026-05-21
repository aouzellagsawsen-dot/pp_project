import express from 'express'
import { getNotifications, markAsRead } from '../controllers/notification.controllers.js'
import { protectMutation } from '../middleware/auth.middleware.js' // Ton middleware de protection

const router = express.Router()

router.get('/', protectMutation, getNotifications)
router.patch('/:id/read', protectMutation, markAsRead)

export default router