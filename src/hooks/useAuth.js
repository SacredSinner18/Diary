import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ensure this path is correct

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext); // This will now access the correct AuthContext
};
