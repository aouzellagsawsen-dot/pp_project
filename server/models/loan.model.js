import mongoose from "mongoose"

const loanSchema = new mongoose.Schema({
    physicalBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhysicalBook',
        required: true
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'returned', 'rejected', 'overdue'],
        default: 'pending' 
    },
    requestDate: { 
        type: Date, 
        default: Date.now 
    },
    startDate: { 
        type: Date 
    },
    dueDate: { 
        type: Date 
    },
    returnDate: { 
        type: Date 
    }
}, {
    timestamps: true
});

const Loan = mongoose.model('Loan', loanSchema)
export default Loan