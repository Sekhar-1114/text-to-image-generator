
import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import ImageGeneratorPage from './components/ImageGeneratorPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    // Check for auth status in localStorage on initial load
    const loggedIn = !!localStorage.getItem('isAuthenticated');
    setIsAuthenticated(loggedIn);
    setIsAuthChecked(true);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  // Render a blank screen or a spinner while checking auth status to prevent flicker
  if (!isAuthChecked) {
    return null; 
  }

  return (
    <>
      {isAuthenticated ? (
        <ImageGeneratorPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default App;
