export const csrfHandler = (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            success: false,
            message: "Le jeton CSRF est invalide ou absent. Vérifiez l'en-tête X-CSRF-Token.",
            code: 'INVALID_CSRF'
        })
    }
    next(err)
}