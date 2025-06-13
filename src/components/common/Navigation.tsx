import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { to: '/', label: 'ホーム', icon: '🏠' },
        { to: '/builder', label: 'ビルダー', icon: '🛠️' },
        { to: '/library', label: 'ライブラリ', icon: '📚' },
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold">Computer Builder</span>
                        </div>
                    </div>

                    {/* デスクトップメニュー */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.to
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => logout()}
                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            ログアウト
                        </button>
                    </div>

                    {/* モバイルメニューボタン */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                        >
                            <span className="sr-only">メニューを開く</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* モバイルメニュー */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.to
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                        >
                            ログアウト
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}; 
