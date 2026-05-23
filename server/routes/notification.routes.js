import express from 'express'
import { getNotifications, markAllAsRead, markAsRead } from '../controllers/notification.controllers.js'
import { authenticateToken } from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/', authenticateToken, getNotifications)
router.patch('/read-all', authenticateToken, markAllAsRead)
router.patch('/:id/read', authenticateToken, markAsRead)

export default router
