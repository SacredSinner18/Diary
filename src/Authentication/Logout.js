import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Logout = () => {
    const { logout } = useAuth(); // Destructure the logout function from useAuth

    const handleLogout = () => {
        logout(); // Call the logout function
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
