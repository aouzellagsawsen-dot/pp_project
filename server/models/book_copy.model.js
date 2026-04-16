import mongoose from "mongoose"

const physicalBookSchema = new mongoose.Schema({
  bookInfos: { 
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
    enum: ['Available', 'Requested', 'Borrowed'], 
    default: 'Available' 
  },
  ownerNotes: {
    type: String,
    maxLength: 250
  }
  
}, { timestamps: true });

const PhysicalBook = mongoose.model('PhysicalBook', physicalBookSchema)
export default PhysicalBook