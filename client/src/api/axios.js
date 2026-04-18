import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // L'adresse de ton serveur Node.js
});

export default api; 