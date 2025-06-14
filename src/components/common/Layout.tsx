import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ToastContainer } from '../ui/ToastContainer';

export function Layout() {
  return (
    <div id="app" className="max-w-7xl mx-auto p-4 md:p-6 h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-grow min-h-0">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
