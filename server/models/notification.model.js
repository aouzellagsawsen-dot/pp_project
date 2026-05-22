import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['loan_request', 'loan_approved', 'loan_rejected', 'message'],
        required: true
    },
    content: {
        type: String,
        required: true
    },

    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Notification = mongoose.model('Notification', notificationSchema)
export default Notification