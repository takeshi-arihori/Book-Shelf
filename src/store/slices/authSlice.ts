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
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
