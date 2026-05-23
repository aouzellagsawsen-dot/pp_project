import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 32
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: 'Invalid email format'
        }
    },
    googleID: {
    type: String,
    unique: true,
    sparse: true 
    },
    password: {
        type: String,
        required: function() {
            return !this.googleID;
        },
        maxlength: 128,
        select: false,
        validate: {
            validator: function(value) {
                if (this.googleID) return true;

                if (!value || value.length < 8) return false;
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
            },
            message: 'Le mot de passe est obligatoire (8 caractères min, avec majuscule, minuscule et chiffre).'
        }
    },
    resetPasswordToken: {
    type: String,
    required: false
    },
    resetPasswordExpires: {
    type: Date,
    required: false
   },
    pdp : {
        type : String,
        default : '/uploads/pdp/default-pdp.webp'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    bio: {
        type: String,
        trim: true,
        maxlength: 200,
        default: "Book lover and avid reader. Always looking for my next great read!"
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', userSchema)
export default User
