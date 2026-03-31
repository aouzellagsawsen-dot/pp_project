const mongoose = require('mongoose');

const bookCopySchema = new mongoose.Schema({
  bookId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['AVAILABLE', 'REQUESTED', 'BORROWED'], 
    default: 'AVAILABLE' 
  },
  condition: { 
    type: String, 
    enum: ['NEW', 'GOOD', 'FAIR', 'POOR'], 
    default: 'GOOD' 
  },
  
}, { timestamps: true });

module.exports = mongoose.model('BookCopy', bookCopySchema);