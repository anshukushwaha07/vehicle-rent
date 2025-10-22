import axios from 'axios';

import type { Vehicle, User, SignUpData} from '../types';

// Use Omit to create a type for the form data, excluding server-generated fields
export type VehicleFormData = Omit<Vehicle, '_id'>;

export interface BookingFormData {
  vehicleId: string;
  startDate: string;
  endDate: string;
}

interface SingleBookingResponse {
  status: 'success';
  data: {
    booking: Booking;
  };
}

interface MyBookingsResponse {
  status: 'success';
  results: number;
  data: {
    bookings: Booking[];
  };
}

export interface Booking {
  _id: string;
  user: User;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

interface BookingsResponse {
  status: 'success';
  results: number;
  data: {
    bookings: Booking[];
  };
}



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


export const getAllBookings = async (): Promise<BookingsResponse> => {
  const { data } = await api.get('/bookings');
  return data;
};

// Create a new booking
export const createBooking = async (bookingData: BookingFormData): Promise<SingleBookingResponse> => {
  const { data } = await api.post('/bookings', bookingData);
  return data;
};

// Get all bookings for the currently logged-in user
export const getMyBookings = async (): Promise<MyBookingsResponse> => {
  const { data } = await api.get('/bookings/my-bookings');
  return data;
};

export default api;