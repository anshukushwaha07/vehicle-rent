import axios from 'axios';

import type { Vehicle, User, SignUpData} from '../types';

// Use Omit to create a type for the form data, excluding server-generated fields
export type VehicleFormData = Omit<Vehicle, '_id'>;

interface AuthResponse {
  status: 'success';
  token: string;
  data: {
    user: User;
  };
}

interface AnalyticsResponse {
  status: 'success';
  data: {
    totalUsers: number;
    totalVehicles: number;
    totalBookings: number;
    revenue: {
      dailyRevenue: number;
      monthlyRevenue: number;
      quarterlyRevenue: number;
      yearlyRevenue: number;
      totalRevenue: number;
    };
  };
}

interface SingleVehicleResponse {
  status: 'success';
  data: {
    vehicle: Vehicle;
  };
}

//  Define API-specific response shapes 
interface VehiclesResponse {
  status: 'success';
  results: number;
  data: {
    vehicles: Vehicle[];
  };
}

export interface AnalyticsData {
  totalUsers: number;
  totalVehicles: number;
  totalBookings: number;
  revenue: {
    dailyRevenue: number;
    monthlyRevenue: number;
    quarterlyRevenue: number;
    yearlyRevenue: number;
    totalRevenue: number;
  };
}

interface AnalyticsResponse {
  status: 'success';
  data: AnalyticsData;
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

// API Functions 

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

export const getVehicles = async (): Promise<VehiclesResponse> => {
  const { data } = await api.get('/vehicles');
  return data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const getAnalyticsData = async (): Promise<AnalyticsResponse> => {
  const { data } = await api.get('/analytics');
  return data;
};


export const getVehicleById = async (id: string): Promise<SingleVehicleResponse> => {
  const { data } = await api.get(`/vehicles/${id}`);
  return data;
};

// Create a new vehicle
export const createVehicle = async (vehicleData: VehicleFormData): Promise<SingleVehicleResponse> => {
  const { data } = await api.post('/vehicles', vehicleData);
  return data;
};

// Update an existing vehicle
export const updateVehicle = async (id: string, vehicleData: Partial<VehicleFormData>): Promise<SingleVehicleResponse> => {
  const { data } = await api.patch(`/vehicles/${id}`, vehicleData);
  return data;
};

// Delete a vehicle
export const deleteVehicle = async (id: string): Promise<void> => {
  await api.delete(`/vehicles/${id}`);
};

export default api;