import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import {loginUser as apiLogin, logoutUser as apiLogout, signupUser as apiSignup, getCurrentUser } from '../services/api';
import type { User, SignUpData } from '../types';
// Define the shape of the context's value
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userData: SignUpData) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start in a loading state

  // This effect runs once when the app loads to check if a user is already logged in
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await getCurrentUser();
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        // This is expected if the user isn't logged in, so we don't show an error toast
        setUser(null);
      } finally {
        // We're done checking, so set loading to false
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []); // The empty dependency array [] ensures this effect runs only once

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      setUser(response.data.user);
      toast.success('Login successful!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Add the  signup function implementation 
  const signup = async (userData: SignUpData) => {
    try {
      const response = await apiSignup(userData);
      // The backend automatically logs the user in, so we set the user state
      setUser(response.data.user);
      toast.success('Account created successfully!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      toast.success('Logout successful!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const isAuthenticated = !!user;

  return (    
    // Add the signup function to the provider's value 
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};