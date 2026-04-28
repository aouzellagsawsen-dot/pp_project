import express from 'express';
import { 
    requestLoan, 
    approveLoan, 
    rejectLoan, 
    getPendingRequests, 
    getMyBorrowedBooks
} from '../controllers/loan.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js'; // Vérifie que le chemin vers auth.middleware est le bon

const router = express.Router();

router.post('/request/:copyId', authenticateToken, requestLoan);
router.put('/approve/:loanId', authenticateToken, approveLoan);
router.put('/reject/:loanId', authenticateToken, rejectLoan);
router.get('/pending-requests', authenticateToken, getPendingRequests);
router.get('/on-going',authenticateToken, getMyBorrowedBooks);

export default router;