export const errorHandler = (err, req, res, next) => {
    // 1. On loggue l'erreur complète dans le terminal pour le développeur
    console.error('ERREUR SERVEUR :', err.stack);

    // 2. On détermine le code HTTP (500 par défaut si non spécifié)
    const statusCode = err.status || err.statusCode || 500;

    // 3. On renvoie une réponse JSON toujours propre et structurée
    res.status(statusCode).json({
        success: false,
        // En mode développement, on affiche le vrai message d'erreur.
        // En mode production, on cache les détails et on met un message générique.
        message: process.env.NODE_ENV === 'production' 
            ? 'Une erreur interne est survenue.' 
            : err.message,
        code: err.code || 'SERVER_ERROR'
    })
}