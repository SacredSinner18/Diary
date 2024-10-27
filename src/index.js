import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Ensure this is imported
import { AuthProvider } from './context/AuthContext'; // Import your AuthProvider
import App from './App';
import 'react-toastify/dist/ReactToastify.css'; // For toast notifications
import './index.css'; // Global CSS styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap the App with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
