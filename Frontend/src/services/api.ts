import axios from 'axios';
import type { Vehicle } from '../pages/VehiclesPage';

// Shared Interfaces 
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  drivingLicenseNumber: string;
}

interface VehiclesResponse {
  status: 'success';
  results: number;
  data: {
    vehicles: Vehicle[];
  };
}

interface AuthResponse {
  status: 'success';
  token: string;
  data: {
    user: User;
  };
}

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5005/api/v1',
  withCredentials: true,
});

//  API Functions 

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post('/users/login', { email, password });
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.get('/users/logout');
  return data;
};

export const signupUser = async (userData: SignUpData): Promise<AuthResponse> => {
  const { data } = await api.post('/users/signup', userData);
  return data;
};

//  THIS FUNCTION IS NOW CORRECT 
export const getVehicles = async (): Promise<VehiclesResponse> => {
  const { data } = await api.get('/vehicles'); 
  return data;
};

export default api;