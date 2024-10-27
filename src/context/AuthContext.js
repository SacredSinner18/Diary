import React, { createContext, useContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };
    
    const logout = () => {
        setUser(null); // Clear user state to log out
        localStorage.removeItem('user'); // Optionally clear user from local storage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Exporting the context for use in the custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// Export the AuthContext for other files to use if needed
export { AuthContext };

