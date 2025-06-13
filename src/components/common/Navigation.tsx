import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navigation = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] border-b-2 border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            to="/"
                            className="flex items-center px-4 text-[#0f172a] font-bold text-xl hover:text-[#4338ca] transition-colors duration-200"
                        >
                            Computer Builder
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/library"
                                    className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/library'
                                        ? 'bg-[#4338ca] text-white'
                                        : 'text-[#334155] hover:bg-[#e2e8f0]'
                                        } transition-colors duration-200`}
                                >
                                    ライブラリ
                                </Link>
                                <Link
                                    to="/profile"
                                    className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/profile'
                                        ? 'bg-[#4338ca] text-white'
                                        : 'text-[#334155] hover:bg-[#e2e8f0]'
                                        } transition-colors duration-200`}
                                >
                                    プロフィール
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-[#334155] hover:bg-[#e2e8f0] rounded-md font-medium transition-colors duration-200"
                                >
                                    ログアウト
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/login'
                                        ? 'bg-[#4338ca] text-white'
                                        : 'text-[#334155] hover:bg-[#e2e8f0]'
                                        } transition-colors duration-200`}
                                >
                                    ログイン
                                </Link>
                                <Link
                                    to="/register"
                                    className={`px-4 py-2 rounded-md font-medium ${location.pathname === '/register'
                                        ? 'bg-[#4338ca] text-white'
                                        : 'text-[#334155] hover:bg-[#e2e8f0]'
                                        } transition-colors duration-200`}
                                >
                                    新規登録
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}; 
