import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 100,
    },
    genre : {
        type : String,
        required : true,
        trim : true,
        enum :{
            values : [ 'Classic Fiction', 'Coming of Age', 'Dystopian', 'Fantasy', 'Historical Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Others'],
            message : '{VALUE} is not a valid genre'
        }
    },
    customGenre : {
        type : String,
        trim : true,
        minLength : 2,
        maxLength : 50,
        required : function() {
            return this.genre === 'Others'
        }
    },
    author : {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 50,
    },
    language: {
        type: String,
        enum: ['French', 'English', 'Arabic', 'Spanish', 'Other'],
        default: 'English'
    },
    description: {
        type: String,
        trim: true,
        maxLength: 1000
    },
    format: {
        type: [String],
        enum: ['Physical', 'PDF'],
        default: ['Physical']
    },
    pages: {
        physical: { type: Number },
        pdf: { type: Number }
    },
    cover : {
        type : String,
        default : `/uploads/covers/default-cover.png`
    },
    quotes: {
        type: [String],
        default: []
    },
    reviews: [reviewSchema],
    averageRating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps : true 
});

const Book = mongoose.model('Book', bookSchema);
export default Book;