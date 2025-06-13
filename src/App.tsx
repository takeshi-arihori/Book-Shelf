import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { Builder } from './pages/Builder';
import { LibraryApp } from './pages/LibraryApp';
import { Layout } from './components/common/Layout';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, initialized } = useSelector((state: RootState) => state.auth);

    // 認証状態が初期化されるまでローディングを表示
    if (!initialized) {
        return <LoadingSpinner />;
    }

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
