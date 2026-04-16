export const errorHandler = (err, req, res, next) => {

if (err.name === 'ValidationError') {
    return res.status(400).json({
        success: false,
        message: "Erreur de validation des données",
        errors: Object.keys(err.errors).map(field => ({
            field,
            message: err.errors[field].message
        })),
        code: 'VALIDATION_ERROR'
    });
}
    console.error('ERREUR SERVEUR :', err.stack);

    const statusCode = err.status || err.statusCode || 500;

    const message = (process.env.NODE_ENV === 'production' && statusCode === 500)
        ? 'Une erreur interne est survenue.' 
        : err.message;

    res.status(statusCode).json({
        success: false,
        message: message,
        code: err.code || 'SERVER_ERROR',
        ...(err.errors && { details: err.errors }) 
    })
}