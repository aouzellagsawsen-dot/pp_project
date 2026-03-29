import express from 'express'
import Book from '../models/book.model.js'
import { uploadCover } from '../middleware/upload.middleware.js'

const router = express.Router()

// ajouter un livre 
router.post('/', uploadCover.single('image'), async (req, res) => {
    try {
        // req.body contient le texte (title, author, genre...)
        let { title, author, genre, customGenre, description } = req.body

        if(genre !== 'Others') {
            customGenre = undefined
        }else 
        {
            document.getElementById('customGenre').style.display = 'none'
        }

        const cover = req.file ? `public/uploads/covers/${req.file.filename}` : null

        // On crée le livre dans MongoDB
        const newBook = await Book.create({
            title,
            author,
            genre,
            customGenre,
            description,
            cover
        })
        if (cover) {
            // On ajoute le chemin de la VRAIE image dans notre objet
            newBook.coverImage = `/public/uploads/covers/${req.file.filename}`
        }

        res.status(201).json({ success: true, data: newBook })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
})

// lister tous les livres
router.get('/list', async (req, res, next) => {
    try {
        // 1. On va chercher tous les livres dans la DB
        // .sort({ createdAt: -1 }) permet d'afficher les plus récents en premier !
        const books = await Book.find().sort({ createdAt: -1 });

        // 2. On affiche la page EJS en lui passant la variable "books"
        res.render('books-list', { books: books });

    } catch (error) {
        next(error)}
});

export default router