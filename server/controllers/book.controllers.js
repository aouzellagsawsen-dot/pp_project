import Book from "../models/book.model.js"
import PhysicalBook from "../models/book_copy.model.js"

// ============ AJOUTER UN LIVRE ============
export const addPhysicalBook = async (req, res) => {
    let { title, author, genre, customGenre, description, quotes } = req.body;

    if (genre !== 'Others') {
        customGenre = undefined;
    }
    let finalQuotes = [];
    if (quotes) {
        // 1. On retransforme le texte du FormData en vrai tableau Javascript
        const parsedQuotes = typeof quotes === 'string' ? JSON.parse(quotes) : quotes;
        
        // 2. On nettoie : on garde uniquement les citations qui ne sont pas vides
        if (Array.isArray(parsedQuotes)) {
            finalQuotes = parsedQuotes.filter(q => q && q.trim() !== "");
        }
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
        const cover = req.file ? `/uploads/covers/${req.file.filename}` : `/uploads/covers/default-cover.png`;

        const newBook = await Book.create({
            title,
            author,
            genre,
            customGenre,
            description,
            cover,
            quotes: finalQuotes
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
}

// ============ SUPPRIMER UN LIVRE ============
export const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id; 

    // ÉTAPE 1 : On cherche et on supprime uniquement LA copie de cet utilisateur
    const deletedCopy = await PhysicalBook.findOneAndDelete({ 
        bookInfos: bookId, 
        ownerId: userId 
    });

    // Si l'utilisateur n'avait pas de copie de ce livre
    if (!deletedCopy) {
        const error = new Error("Vous ne possédez pas d'exemplaire de ce livre, ou il est introuvable.");
        error.statusCode = 404;
        throw error;
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
}

// ============ MODIFIER UN LIVRE ============
export const updateBook = async (req, res) => {
    const bookId = req.params.id;
    
    // On récupère toutes les données envoyées dans le body
    let updateData = { ...req.body };

    // Gestion spécifique du genre 
    if (updateData.genre && updateData.genre !== 'Others') {
        updateData.customGenre = undefined;
    }

    // Si l'utilisateur a uploadé une NOUVELLE image, on met à jour le chemin
    // J'ai corrigé ici aussi, plus besoin de 'public/' devant le chemin !
    if (req.file) {
        updateData.cover = `/uploads/covers/${req.file.filename}`;
    }

    // On met à jour le document MongoDB
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { 
        new: true, 
        runValidators: true
    });

    if (!updatedBook) {
        const error = new Error("Livre introuvable.");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ 
        success: true, 
        message: "Livre mis à jour avec succès !", 
        data: updatedBook 
    });
}

// ============ LISTER TOUS LES LIVRES ============
/* export const allBooks = async (req, res) => {
    // 1. On va chercher tous les livres dans la DB
    // .sort({ createdAt: -1 }) permet d'afficher les plus récents en premier !
    const books = await Book.find().sort({ createdAt: -1 });

    // 2. On renvoie du JSON au Front ! Fini le res.render('books-list')
    res.status(200).json({
        success: true,
        data: books
    });
}*/

// ============ RÉCUPÉRER UN SEUL LIVRE PAR ID ============
export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ success: false, message: "Livre introuvable." });
        }
        
        res.status(200).json({ 
            success: true, 
            data: book 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// ============ LISTER TOUS LES LIVRES ============
export const allBooks = async (req, res) => {

    const books = await Book.find().sort({ createdAt: -1 });

    const booksWithStatus = await Promise.all(books.map(async (book) => {
        
        const copies = await PhysicalBook.find({ bookInfos: book._id });


        const availableCopy = copies.find(copy => copy.status === 'Available');

        let finalStatus = 'borrowed';
        let copyIdToReserve = null;

        if (availableCopy) {
            finalStatus = 'available';
            copyIdToReserve = availableCopy._id;
        } else if (copies.length === 0) {
            finalStatus = 'unavailable';
        }

        // On fusionne tout !
        return {
            ...book.toObject(),
            status: finalStatus,
            copyToReserve: copyIdToReserve
        };
    }));

    // 3. On envoie au Front
    res.status(200).json({
        success: true,
        data: booksWithStatus
    });
}