import { NavLink } from 'react-router-dom';
import { appRoutes } from '../../routes';

export const Navigation = () => {
  const navLinks = appRoutes.filter((route) => route.inNav);

  return (
    <nav>
      <ul className="flex items-center space-x-4">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.index ? '/' : link.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
