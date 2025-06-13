import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    initialized: boolean;
}

const initialState: AuthState = {
    token: null,
    user: { id: '1', name: 'テストユーザー' },
    isAuthenticated: true,
    initialized: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; user: User }>) => {
            console.log('Setting auth state:', action.payload);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.initialized = true;
            console.log('New auth state:', state);
        },
        clearAuth: (state) => {
            console.log('Clearing auth state');
            state.token = null;
            state.user = { id: '1', name: 'テストユーザー' };
            state.isAuthenticated = true;
            state.initialized = true;
            console.log('New auth state:', state);
        },
        setInitialized: (state) => {
            console.log('Setting initialized to true');
            state.initialized = true;
            console.log('New auth state:', state);
        },
    },
});

export const { setAuth, clearAuth, setInitialized } = authSlice.actions;
export default authSlice.reducer;
