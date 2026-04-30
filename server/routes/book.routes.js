import express from 'express'
import { uploadCover } from '../middleware/upload.middleware.js'
import { protectMutation } from '../middleware/auth.middleware.js'
import { addPhysicalBook, getBookById, allBooks, deleteBook, updateBook, getMyAddedBooks } from '../controllers/book.controllers.js'

const router = express.Router()

router.post('/', protectMutation, uploadCover.single('image'), addPhysicalBook)
router.delete('/:id', protectMutation, deleteBook)
router.patch('/:id', protectMutation, uploadCover.single('image'), updateBook)
router.get('/list', allBooks)
router.get('/shared-books', protectMutation, getMyAddedBooks)
router.get('/:id', getBookById)

export default router