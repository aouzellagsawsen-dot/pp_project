import express from 'express'
import { uploadCover } from '../middleware/upload.middleware.js'
import { protectMutation } from '../middleware/auth.middleware.js'
import { addPhysicalBook, allBooks, deleteBook, updateBook } from '../controllers/book.controllers.js'
import { approveLoan, requestLoan } from '../controllers/loan.controller.js'

const router = express.Router()

// =========== AJOUTER UN LIVRE =============
router.post('/', protectMutation, uploadCover.single('image'), addPhysicalBook)

// ============ SUPPRIMER UN LIVRE ============
router.delete('/:id', protectMutation, deleteBook)

// ============ MODIFIER UN LIVRE ============
router.put('/:id', protectMutation, uploadCover.single('image'), updateBook)

// lister tous les livres
router.get('/list', allBooks)

// Le borrower fait la demande sur une copie spécifique
router.post('/copy/:copyId/request-loan', protectMutation, requestLoan)

// Le lender approuve (ou rejette) une demande spécifique
router.post('/loan/:loanId/approve', protectMutation, approveLoan)
// (Tu pourras créer une fonction rejectLoan similaire qui remet le livre en 'Available')

export default router