import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 100,
    },
    cover : {
        type : Image,
        required : true,
        
    }
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
    book_cover : {
        type 
    }



    }

    }
})