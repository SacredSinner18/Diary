import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if a user session is saved in localStorage on app load
        const storedUser = localStorage.getItem('userID');
        if (storedUser) {
            setUser({ userID: storedUser });
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userID', userData.userID); // Save userID to localStorage
    };
    
    const logout = () => {
        setUser(null); // Clear user state to log out
        localStorage.removeItem('userID'); // Clear user from localStorage
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

