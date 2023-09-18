// AuthContext.js
import React from 'react';

// Define the context with default values (they won't be used)
export const AuthContext = React.createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  token: null,
  setToken: () => {}
});
