import express from 'express'
import { uploadCover } from '../middleware/upload.middleware.js'
import { protectMutation } from '../middleware/auth.middleware.js'
import { addPhysicalBook, getBookById, allBooks, deleteBook, updateBook } from '../controllers/book.controllers.js'
import { approveLoan, rejectLoan, requestLoan } from '../controllers/loan.controllers.js'

const router = express.Router()

// =========== AJOUTER UN LIVRE =============
router.post('/', protectMutation, uploadCover.single('image'), addPhysicalBook)

// ============ SUPPRIMER UN LIVRE ============
router.delete('/:id', protectMutation, deleteBook)

// ============ MODIFIER UN LIVRE ============
router.patch('/:id', protectMutation, uploadCover.single('image'), updateBook)

// lister tous les livres
router.get('/list', allBooks)
router.get('/:id', getBookById);

// Le borrower fait la demande sur une copie spécifique
router.post('/copy/:copyId/request-loan', protectMutation, requestLoan)

// Le lender approuve (ou rejette) une demande spécifique
router.post('/loan/:loanId/approve', protectMutation, approveLoan)
// (Tu pourras créer une fonction rejectLoan similaire qui remet le livre en 'Available')
router.patch('loan/:loanId/reject', protectMutation, rejectLoan)

export default router