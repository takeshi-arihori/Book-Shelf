import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch({ type: 'auth/clearAuth' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 
