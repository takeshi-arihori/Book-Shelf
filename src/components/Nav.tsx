import { Link, useLocation } from 'react-router-dom';

export const Nav = () => {
    const location = useLocation();
    const navItems = [
        { to: '/', label: 'Home', color: 'primary', icon: '🏠' },
        { to: '/builder', label: 'Builder', color: 'accent', icon: '🛠️' },
        { to: '/library', label: 'Library', color: 'secondary', icon: '📚' },
    ];
    return (
        <nav className="flex gap-2 md:gap-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 shadow-md sticky top-0 z-10">
            {navItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`btn btn-${item.color} flex items-center gap-2 transition-all duration-200 shadow-sm border-none px-4 py-2 text-base font-semibold rounded-full ${location.pathname === item.to ? 'scale-110 ring-2 ring-offset-2 ring-blue-400' : ''}`}
                >
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                </Link>
            ))}
        </nav>
    );
};
