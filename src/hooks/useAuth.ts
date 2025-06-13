import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { setAuth, clearAuth } from '../store/slices/authSlice';
import { login as apiLogin, logout as apiLogout } from '../api/authApi';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const login = async (userId: string, password: string) => {
        const response = await apiLogin({ userId, password });
        dispatch(setAuth(response));
        navigate('/');
    };

    const logout = async () => {
        await apiLogout();
        dispatch(clearAuth());
        navigate('/login');
    };

    return {
        isAuthenticated,
        user,
        login,
        logout,
    };
};
