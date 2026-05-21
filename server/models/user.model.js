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
        // Requis seulement si on n'a pas d'ID Google
        required: function() {
            return !this.googleID;
        },
        maxlength: 128,
        select: false, // Sécurité : exclu des requêtes par défaut
        validate: {
            validator: function(value) {
                // 1. Si c'est un utilisateur Google, on valide sans vérifier le mot de passe
                if (this.googleID) return true;

                // 2. Sinon, on vérifie manuellement la présence, la longueur et le format
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
        default: false // Faux par défaut à la création
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

// Hash password before saving
userSchema.pre('save', async function() {
    // 1. Si le mot de passe n'est pas modifié, on s'arrête là
    if (!this.isModified('password')) return;

    // 2. Hachage du mot de passe
    // mais on peut le garder pour la sécurité.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}


userSchema.methods.getResetPasswordToken = function() {
    // 1. Génération du jeton brut (Plain Text)
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Hachage du jeton pour le stockage en base de données
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 3. Définition de l'expiration (10 minutes converties en ms)
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    // 4. On retourne le jeton brut
    return resetToken;
};




const User = mongoose.model('User', userSchema)
export default User
