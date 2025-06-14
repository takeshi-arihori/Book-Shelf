import axios from 'axios';
import { supabase } from '../lib/supabaseClient';
import { getToken, isTokenExpired } from '../utils/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // トークンが無効な場合、ログアウト処理を実行
            await supabase.auth.signOut();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 
