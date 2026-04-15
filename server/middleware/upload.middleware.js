import multer from 'multer'
import path from 'path'

// 1. Configuration du stockage
const coverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/covers') 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const pdpStorage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/uploads/pdp') 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }

})

// 2. Filtre de sécurité (On n'accepte QUE les images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error("Le fichier n'est pas une image !"), false)
    }
}

// 3. Export du middleware
export const uploadCover = multer({ 
    storage: coverStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5 Mo maximum
})

export const uploadPdp = multer({ 
    storage: pdpStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5 Mo maximum
})