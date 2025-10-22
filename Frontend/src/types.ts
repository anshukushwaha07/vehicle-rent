// src/types.ts

// This file will be the single source of truth for your data shapes.

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

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: 'car' | 'bike' | 'scooter' | 'van';
  pricePerDay: number;
  imageUrl: string;
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