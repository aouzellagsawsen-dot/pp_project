import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
    // 1. Requis seulement si on n'a pas d'ID Google
    required: function() {
        return !this.googleID;
    },
    validate: {
        validator: function(value) {
            // 2. Si c'est un utilisateur Google, on court-circuite tout : c'est valide.
            if (this.googleID) return true;

            // 3. Sinon, on vérifie manuellement la longueur et le format
            if (!value || value.length < 8) return false;
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
        },
        message: 'Le mot de passe est obligatoire (8 caractères min, avec majuscule, minuscule et chiffre).'
    },
        maxlength: 128,
        select: false, // Exclude password from query results by default
        validate: {
            validator: function(value) {
                // Password must contain at least one uppercase letter, one lowercase letter, and one number
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
            },
            message: 'Password must contain uppercase, lowercase letters and a number'
        }
    },
    pdp : {
        type : String,
        default : 'public/uploads/pdp/default-pdp.webp'
    },
    isVerified: {
        type: Boolean,
        default: false // Faux par défaut à la création
    }
}, {
    timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
    // If password is not modified, skip hashing
    if (!this.isModified('password')) {
        next()
        return
    }
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        next(error)
        return
    }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
