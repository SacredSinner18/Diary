import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AuthPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Show login form by default
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth(); // Get login function from Auth Context

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  
  // New password validation
  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 6;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const validateConfirmPassword = () => password === confirmPassword;

  const saveSession = () => {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userID', userID);
  };

  const redirectToHomePage = () => {
    setTimeout(() => {
      window.location.href = "/notes"; // Replace with actual route for homepage
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); // Clear success message on new register attempt

    if (!validateEmail(userID) && !validatePhone(userID)) {
      setErrorMessage("Please enter a valid email or 10-digit phone number.");
      return;
    }

    // Check if the email or phone is already registered
    const registeredUserID = localStorage.getItem('registeredUser');
    if (registeredUserID === userID) {
      setErrorMessage("This email or phone number is already registered. Use another email or phone to register.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }
    if (!validateConfirmPassword()) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Save userID in localStorage as a registered user
    localStorage.setItem('registeredUser', userID);
    
    // Set success message
    setSuccessMessage("Registration successful! You can now log in.");
    
    // Clear password fields after successful registration
    setPassword('');
    setConfirmPassword('');
    setIsLogin(true); // Redirect to login form after successful registration
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); // Clear success message on new login attempt

    const registeredUserID = localStorage.getItem('registeredUser');
    if (registeredUserID === userID) {
      saveSession();
      login({ userID }); // Update this line to use the login function from context
      navigate('/notes'); // Redirect to notes page after successful login
    } else {
      setErrorMessage("This login ID is not registered.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <div className="auth-page">
      <h2>Notes Keeper App</h2>

      {isLogin ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="userID">UserID</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <i
                className={`fas ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
                title="Show password"
              />
            )}
          </div>
          <button type="submit">Login</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <p>
            New USER?{" "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsLogin(false);
                setErrorMessage('');
                setSuccessMessage(''); // Clear success message when switching
              }}
            >
              Register
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <label htmlFor="userID">Email or Phone</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <i
                className={`fas ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
                title="Show password"
              />
            )}
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-container">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && (
              <i
                className={`fas ${isConfirmPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={toggleConfirmPasswordVisibility}
                title="Show password"
              />
            )}
          </div>
          <button type="submit">Register</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <p>
            Already registered?{" "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsLogin(true);
                setErrorMessage('');
                setSuccessMessage(''); // Clear success message when switching
                setPassword(''); // Clear only password fields
                setConfirmPassword('');
              }}
            >
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
