import PhysicalBook from "../models/book_copy.model.js"
import Loan from "../models/loan.model.js"
import Notification from "../models/notification.model.js"

// ============ 1. DEMANDER UN EMPRUNT ============
export const requestLoan = async (req, res) => {
    const copyId = req.params.copyId
    const borrowerId = req.user.id

    const copy = await PhysicalBook.findById(copyId)

    if (!copy) {
        const error = new Error("This copy could not be found.")
        error.statusCode = 404
        throw error
    }

    if (copy.ownerId.toString() === borrowerId) {
        const error = new Error("You cannot borrow your own book.")
        error.statusCode = 400
        throw error
    }

    if (copy.status !== 'Available') {
        const error = new Error("This book is not available at the moment.")
        error.statusCode = 400
        throw error
    }

    // On crée la demande d'emprunt dans l'historique
    const newLoan = await Loan.create({
        physicalBook: copy._id,
        borrower: borrowerId,
        lender: copy.ownerId 
    })

    copy.status = 'Requested'
    await copy.save()

    // 🔥 NOUVEAU : Création de la notification pour le PROPRIÉTAIRE
    await Notification.create({
        recipient: copy.ownerId,     // Le propriétaire reçoit l'alerte
        sender: borrowerId,          // L'emprunteur déclenche l'alerte
        type: 'loan_request',
        content: "requested to borrow one of your books.",
        relatedId: newLoan._id       // Lien vers la demande pour le front
    });

    res.status(201).json({ 
        success: true, 
        message: "Your loan request has been sent to the owner!",
        data: newLoan
    });
}

// ============ 2. ACCEPTER UN EMPRUNT ============
export const approveLoan = async (req, res) => {
    const loanId = req.params.loanId; 
    const lenderId = req.user.id;

    const { dueDate } = req.body;

    // On récupère le prêt en incluant les infos du livre physique
    const loan = await Loan.findById(loanId).populate('physicalBook');

    if (!loan) {
        const error = new Error("Loan request not found.");
        error.statusCode = 404;
        throw error;
    }

    // Vérification de sécurité : Seul le propriétaire peut accepter
    if (loan.lender.toString() !== lenderId) {
        const error = new Error("You are not authorized to approve this request.");
        error.statusCode = 403;
        throw error;
    }

    if (loan.status !== 'pending') {
        const error = new Error("This request has already been processed.");
        error.statusCode = 400;
        throw error;
    }

    // 1. Mise à jour du document Loan
    loan.status = 'active';
    loan.startDate = Date.now();
    
    // Calcul de la date de retour (ex: 30 jours plus tard)
    let returnDate = new Date();
    if (dueDate) {
        returnDate = new Date(dueDate);
    } else {
        returnDate.setDate(returnDate.getDate() + 30);
    }
    loan.dueDate = returnDate;

    await loan.save();

    // 2. Mise à jour du statut du livre physique
    const copy = loan.physicalBook;
    copy.status = 'Borrowed'; 
    copy.borrowerId = loan.borrower; 
    await copy.save();

    const formattedDate = returnDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Création de la notification pour l'EMPRUNTEUR
    await Notification.create({
        recipient: loan.borrower,    // L'emprunteur reçoit la bonne nouvelle
        sender: lenderId,            // Le propriétaire est l'expéditeur
        type: 'loan_approved',
        content: `approved your loan request! Please return the book by ${formattedDate}.`,
        relatedId: loan._id          // Lien vers le prêt actif
    });

    res.status(200).json({ 
        success: true, 
        message: `Loan approved! Return deadline set for ${formattedDate}.`,
        data: loan
    });
}

// ============ 3. REFUSER UN EMPRUNT ============
export const rejectLoan = async (req, res) => {
    const loanId = req.params.loanId; 
    const lenderId = req.user.id;

    // On récupère le prêt en incluant les infos du livre physique
    const loan = await Loan.findById(loanId).populate('physicalBook');

    if (!loan) {
        const error = new Error("Loan request not found.");
        error.statusCode = 404;
        throw error;
    }

    // Vérification de sécurité : Seul le propriétaire peut refuser
    if (loan.lender.toString() !== lenderId) {
        const error = new Error("You are not authorized to approve this request.");
        error.statusCode = 403;
        throw error;
    }

    if (loan.status !== 'pending') {
        const error = new Error("This request has already been processed.");
        error.statusCode = 400;
        throw error;
    }

    // 1. Mise à jour du document Loan
    loan.status = 'rejected';
    // On ne met pas de date de début ou de fin puisqu'il est refusé !
    await loan.save();

    // 2. Mise à jour du statut du livre physique
    const copy = loan.physicalBook;
    
    // On compte s'il y a d'autres personnes en salle d'attente pour ce même livre
    const remainingRequests = await Loan.countDocuments({
        physicalBook: copy._id,
        status: 'pending'
    });

    // S'il n'y a plus personne en attente, le livre redevient disponible pour tout le monde
    if (remainingRequests === 0) {
        copy.status = 'Available'; 
        await copy.save();
    }

    // 3. Création de la notification pour l'EMPRUNTEUR
    await Notification.create({
        recipient: loan.borrower,    // L'emprunteur reçoit la mauvaise nouvelle
        sender: lenderId,            // Le propriétaire est l'expéditeur
        type: 'loan_rejected',
        content: "unfortunately declined your loan request.",
        relatedId: loan._id          // Lien vers le prêt (qui est maintenant 'rejected')
    });

    res.status(200).json({ 
        success: true, 
        message: "The loan request has been successfully declined.",
        data: loan
    });
}

// ============ 4. VOIR LES DEMANDES EN ATTENTE ============
export const getPendingRequests = async (req, res) => {
    try {
        const lenderId = req.user.id; // L'ID du propriétaire connecté

        // On cherche tous les emprunts "pending" destinés à ce propriétaire
        const pendingLoans = await Loan.find({ 
            lender: lenderId, 
            status: 'pending' 
        })
        .populate({
            path: 'physicalBook',
            populate: {
                path: 'bookInfos'
            }
        }) // Récupère le titre et l'image du livre
        .populate('borrower', 'name email'); // Récupère le nom de celui qui demande

        res.status(200).json({
            success: true,
            data: pendingLoans
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// ============ 5. VOIR LES DEMANDES EN ATTENTE ============
export const getMyBorrowedBooks = async (req, res) => {
    const userId = req.user.id;

    const activeLoans = await Loan.find({
        borrower: userId,
        status: 'active'
    })
    .populate({
        path: 'physicalBook',
        populate: {
            path: 'bookInfos'
        }
    });

    const formattedBooks = activeLoans.map(loan => {
        if (!loan.physicalBook || !loan.physicalBook.bookInfos) return null;

        return {
            ...loan.physicalBook.bookInfos.toObject(),
            loanId: loan._id,                          
            copyId: loan.physicalBook._id,            
            startDate: loan.startDate,                
            dueDate: loan.dueDate               
        };
    }).filter(item => item !== null);

    res.status(200).json({
        success: true,
        data: formattedBooks,
        count: formattedBooks.length
    });
}
