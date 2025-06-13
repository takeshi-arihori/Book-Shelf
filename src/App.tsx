import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { Builder } from './pages/Builder';
import { LibraryApp } from './pages/LibraryApp';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/common/Layout';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/builder"
                element={
                    <PrivateRoute>
                        <Builder />
                    </PrivateRoute>
                }
            />
            <Route
                path="/library"
                element={
                    <PrivateRoute>
                        <LibraryApp />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppRoutes />
            </Router>
        </Provider>
    );
};
