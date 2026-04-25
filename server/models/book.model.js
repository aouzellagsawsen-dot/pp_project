import mongoose from "mongoose"

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
    description: {
        type: String,
        trim: true,
        maxLength: 1000
    },
    cover : {
        type : String,
        default : `/uploads/covers/default-cover.png`

    },
    quotes: {
        type: [String],
        default: []
    }
    
    }, {
        timestamps : true
    }
)

const Book = mongoose.model('Book', bookSchema)
export default Book 