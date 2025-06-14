import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SearchProvider } from './store/contexts/SearchContext';
import { ToastProvider } from './store/contexts/ToastContext';
import { AuthProvider } from './store/contexts/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <SearchProvider>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </SearchProvider>
  </React.StrictMode>
);
