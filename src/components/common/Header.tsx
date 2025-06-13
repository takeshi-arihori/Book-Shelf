import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-strong">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-2xl font-bold text-white hover:text-primary-100 transition-colors duration-200">
                        Computer Builder
                    </Link>
                    <nav className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/library" className="text-white hover:text-primary-100 transition-colors duration-200 border-b-2 border-primary-300 hover:border-primary-100">
                                    ライブラリ
                                </Link>
                                <Link to="/profile" className="text-white hover:text-primary-100 transition-colors duration-200 border-b-2 border-primary-300 hover:border-primary-100">
                                    プロフィール
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-white hover:text-primary-100 transition-colors duration-200 border-b-2 border-primary-300 hover:border-primary-100"
                                >
                                    ログアウト
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-primary-100 transition-colors duration-200 border-b-2 border-primary-300 hover:border-primary-100">
                                    ログイン
                                </Link>
                                <Link to="/register" className="text-white hover:text-primary-100 transition-colors duration-200 border-b-2 border-primary-300 hover:border-primary-100">
                                    新規登録
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};
