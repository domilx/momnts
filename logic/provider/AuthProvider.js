// AuthProvider.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService'; // Assuming you have an AuthService.js

const authService = new AuthService();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      // Get token from AsyncStorage
      const storedToken = await AsyncStorage.getItem('access_token');

      if (storedToken) {
        // Validate token with the server
        try {
          const isValid = await authService.validateToken(storedToken); // You'll need to implement this in AuthService

          if (isValid) {
            setIsLoggedIn(true);
            setToken(storedToken);
          } else {
            setIsLoggedIn(false);
            setToken(null);
            await AsyncStorage.removeItem('access_token');
          }
        } catch (error) {
          console.error("Error validating token:", error);
        }
      }
    }
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
