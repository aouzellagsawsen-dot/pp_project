import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // L'adresse de ton serveur Node.js
    withCredentials: true // Permet d'envoyer les cookies (utile pour l'authentification)
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchAndSetCsrfToken = async () => {
    try {
        const response = await api.get('/api/auth/csrf-token'); // L'URL de ta route backend
        const token = response.data.csrfToken;
        
        // On dit à Axios d'ajouter ce token dans les headers de TOUTES les futures requêtes
        api.defaults.headers.common['x-csrf-token'] = token;
        
        console.log("✅ Token CSRF configuré automatiquement !");
    } catch (error) {
        console.error("❌ Impossible de récupérer le token CSRF", error);
    }
};

export default api;