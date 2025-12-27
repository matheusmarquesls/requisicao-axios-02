import axios from 'axios'
export const api = axios.create({
    baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});