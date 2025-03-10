"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize state, checking if running in browser (window exists)
  const [username, setUsername] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('username');
    }
    return null;
  });

  useEffect(() => {
    // Sync localStorage when username changes
    if (username !== null) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('jwt_token');
    }

    // Listen for localStorage changes
    const handleStorageChange = () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername !== username) {
        setUsername(storedUsername);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [username]);

  const logout = () => {
    setUsername(null); // Remove username from context and localStorage
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
