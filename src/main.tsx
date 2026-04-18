import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>,
);
