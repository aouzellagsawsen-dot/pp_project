import PhysicalBook from "../models/book_copy.model.js"
import Loan from "../models/loan.model.js"


// ============ 1. DEMANDER UN EMPRUNT ============
export const requestLoan = async (req, res, next) => {
    try {
        const copyId = req.params.copyId
        const borrowerId = req.user.id

        const copy = await PhysicalBook.findById(copyId)

        if (!copy) {
            const error = new Error("Cet exemplaire est introuvable.")
            error.statusCode = 404
            return next(error)
        }

        if (copy.ownerId.toString() === borrowerId) {
            const error = new Error("Vous ne pouvez pas emprunter votre propre livre.")
            error.statusCode = 400
            return next(error);
        }

        if (copy.status !== 'Available') {
            const error = new Error("Ce livre n'est pas disponible pour le moment.")
            error.statusCode = 400
            return next(error);
        }

        // On crée la demande d'emprunt dans l'historique
        const newLoan = await Loan.create({
            physicalBook: copy._id,
            borrower: borrowerId,
            lender: copy.ownerId // On trouve le prêteur directement grâce à la copie !
            // 'status' se met automatiquement à 'pending'
            // 'requestDate' se met automatiquement à la date actuelle
        })

        copy.status = 'Requested'
        await copy.save()

        res.status(201).json({ 
            success: true, 
            message: "Votre demande d'emprunt a été envoyée au propriétaire !",
            data: newLoan
        });

    } catch (error) {
        next(error);
    }
}

// ============ 2. ACCEPTER UN EMPRUNT ============
export const approveLoan = async (req, res, next) => {
    try {
        const loanId = req.params.loanId; // Attention, ici on cible l'ID du Loan, pas du livre
        const lenderId = req.user.id;

        // On récupère le prêt en incluant les infos du livre physique
        const loan = await Loan.findById(loanId).populate('physicalBook');

        if (!loan) {
            const error = new Error("Demande d'emprunt introuvable.");
            error.statusCode = 404;
            return next(error);
        }

        // Vérification de sécurité : Seul le propriétaire peut accepter
        if (loan.lender.toString() !== lenderId) {
            const error = new Error("Vous n'êtes pas autorisé à approuver cette demande.");
            error.statusCode = 403;
            return next(error);
        }

        if (loan.status !== 'pending') {
            const error = new Error("Cette demande a déjà été traitée.");
            error.statusCode = 400;
            return next(error);
        }

        // 1. Mise à jour du document Loan
        loan.status = 'active';
        loan.startDate = Date.now();
        
        // Calcul de la date de retour (ex: 30 jours plus tard)
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 30);
        loan.dueDate = returnDate;

        await loan.save();

        // 2. Mise à jour du statut du livre physique
        const copy = loan.physicalBook;
        copy.status = 'Borrowed'; // Passe de 'Reserved' à 'Borrowed'
        copy.borrowerId = loan.borrower; // On garde une trace de l'emprunteur actuel
        await copy.save();

        res.status(200).json({ 
            success: true, 
            message: "Emprunt validé ! L'emprunteur a 30 jours pour le rendre.",
            data: loan
        });

    } catch (error) {
        next(error);
    }
}

