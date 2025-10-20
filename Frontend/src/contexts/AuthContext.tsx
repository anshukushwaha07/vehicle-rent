import { createContext, useState, useContext, type ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { type User, type SignUpData, loginUser as apiLogin, logoutUser as apiLogout, signupUser as apiSignup } from '../services/api';

// Define the shape of the context's value
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userData: SignUpData) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
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