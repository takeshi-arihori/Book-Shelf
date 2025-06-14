import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth, clearAuth } from '../store/slices/authSlice';
// import { login as apiLogin, logout as apiLogout } from '../api/authApi';
import { signOut as apiLogout } from '../api/authApi';
import { setToken, removeToken } from '../utils/auth';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (userId: string, password: string) => {
        // try {
        //     console.log('Attempting login...');
        // const response = await apiLogin({ userId, password });
        //     console.log('ログイン成功:', response);
        //     setToken(response.token);
        // dispatch(setAuth(response));
        // navigate('/');
        // } catch (error) {
        //     console.error('ログインエラー:', error);
        //     throw error;
        // }
    };

    const logout = async () => {
        try {
            console.log('Attempting logout...');
        await apiLogout();
            removeToken();
            dispatch(clearAuth());
            navigate('/login');
        } catch (error) {
            console.error('ログアウトエラー:', error);
            removeToken();
        dispatch(clearAuth());
        navigate('/login');
        }
    };

    return {
        isAuthenticated: true, // 一時的に常にtrueを返す
        user: { id: '1', name: 'テストユーザー' }, // 一時的に固定ユーザーを返す
        login,
        logout,
    };
};
