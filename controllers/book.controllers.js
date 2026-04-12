import Book from "../models/book.model.js"
import PhysicalBook from "../models/book_copy.model.js"

// ============ AJOUTER UN LIVRE ============
export const addPhysicalBook = async (req, res) => {
    try {
        let { title, author, genre, customGenre, description } = req.body;

        if (genre !== 'Others') {
            customGenre = undefined;
        }

        // 1. RECHERCHE DU LIVRE EXISTANT
        const existingBook = await Book.findOne({ 
            title: { $regex: new RegExp(`^${title}$`, 'i') },
            author: { $regex: new RegExp(`^${author}$`, 'i') }
        });

        let targetBookId;
        let bookData;

        // 2. LOGIQUE CONDITIONNELLE (Existe-t-il ?)
        if (existingBook) {
            // Le livre existe déjà ! On ne le recrée pas, on garde juste son ID.
            targetBookId = existingBook._id;
            bookData = existingBook;
            
        } else {
            // Le livre n'existe pas, on le crée.
            
            // (J'ai enlevé le '/public' ici comme tu l'avais brillamment corrigé avant)
            const cover = req.file ? `/uploads/covers/${req.file.filename}` : `/uploads/covers/default-cover.png`;

            const newBook = await Book.create({
                title,
                author,
                genre,
                customGenre,
                description,
                cover
            });

            targetBookId = newBook._id;
            bookData = newBook;
        }

        // 3. CRÉATION DE LA COPIE PHYSIQUE
        const newPhysicalBook = await PhysicalBook.create({
            bookInfos: targetBookId,
            ownerId: req.user.id,
            status: 'Available'
        });

        // On renvoie un message dynamique pour savoir ce qu'il s'est passé en coulisses
        const responseMessage = existingBook 
            ? "Livre existant trouvé, nouvelle copie ajoutée !" 
            : "Nouveau livre et nouvelle copie créés avec succès !";

        res.status(201).json({ 
            success: true, 
            message: responseMessage,
            data: bookData, 
            copy: newPhysicalBook 
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// ============ SUPPRIMER UN LIVRE ============
export const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id; // L'ID de l'utilisateur qui fait la requête

        // ÉTAPE 1 : On cherche et on supprime uniquement LA copie de cet utilisateur
        const deletedCopy = await PhysicalBook.findOneAndDelete({ 
            bookInfos: bookId, 
            ownerId: userId 
        });

        // Si l'utilisateur n'avait pas de copie de ce livre
        if (!deletedCopy) {
            const error = new Error("Vous ne possédez pas d'exemplaire de ce livre, ou il est introuvable.");
            error.statusCode = 404;
            return next(error); // 🔥 Envoi au gestionnaire global
        }

        // ÉTAPE 2 : On compte combien de copies il reste pour ce livre (celles des autres)
        const remainingCopies = await PhysicalBook.countDocuments({ bookInfos: bookId });

        // ÉTAPE 3 : S'il ne reste plus aucune copie, on supprime l'œuvre abstraite
        if (remainingCopies === 0) {
            await Book.findByIdAndDelete(bookId);
        }

        res.status(200).json({ 
            success: true, 
            message: "Votre exemplaire a été retiré de votre inventaire avec succès !" 
        });

    } catch (error) {
        next(error); // 🔥 Envoi au gestionnaire global en cas de crash
    }
}

// ============ MODIFIER UN LIVRE ============
export const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        
        // On récupère toutes les données envoyées dans le body
        let updateData = { ...req.body };

        // Gestion spécifique du genre 
        if (updateData.genre && updateData.genre !== 'Others') {
            updateData.customGenre = undefined;
        }

        // Si l'utilisateur a uploadé une NOUVELLE image, on met à jour le chemin
        if (req.file) {
            updateData.cover = `public/uploads/covers/${req.file.filename}`;
        }

        // On met à jour le document MongoDB
        const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { 
            new: true, 
            runValidators: true
        });

        if (!updatedBook) {
            const error = new Error("Livre introuvable.");
            error.statusCode = 404;
            return next(error); // 🔥 Envoi au gestionnaire global
        }

        res.status(200).json({ 
            success: true, 
            message: "Livre mis à jour avec succès !", 
            data: updatedBook 
        });

    } catch (error) {
        next(error); // 🔥 Envoi au gestionnaire global en cas de crash
    }
}

// lister tous les livres
export const allBooks = async (req, res, next) => {
    try {
        // 1. On va chercher tous les livres dans la DB
        // .sort({ createdAt: -1 }) permet d'afficher les plus récents en premier !
        const books = await Book.find().sort({ createdAt: -1 });

        // 2. On affiche la page EJS en lui passant la variable "books"
        res.render('books-list', { books: books });

    } catch (error) {
        next(error)}
}