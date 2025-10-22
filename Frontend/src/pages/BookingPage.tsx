import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getVehicleById, createBooking, type BookingFormData } from '../services/api';
import type { Vehicle } from '../types';
import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

// Helper function to calculate the number of days between two dates
const calculateDays = (start: string, end: string): number => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  if (timeDiff <= 0) return 0; // End date must be after start date
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return days;
};

export default function BookingPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the vehicle's details when the component loads
  useEffect(() => {
    if (!vehicleId) return;
    setIsLoading(true);
    getVehicleById(vehicleId)
      .then(response => {
        setVehicle(response.data.vehicle);
      })
      .catch(() => {
        toast.error('Failed to load vehicle details.');
        navigate('/vehicles'); // Send user back if vehicle not found
      })
      .finally(() => setIsLoading(false));
  }, [vehicleId, navigate]);

  // Recalculate the total price whenever dates or vehicle price change
  useEffect(() => {
    if (vehicle) {
      const days = calculateDays(startDate, endDate);
      setTotalPrice(days * vehicle.pricePerDay);
    }
  }, [startDate, endDate, vehicle]);

  // 3. Handle the booking submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleId || !startDate || !endDate) {
      toast.error('Please select both a start and end date.');
      return;
    }
    if (totalPrice <= 0) {
      toast.error('End date must be after the start date.');
      return;
    }

    setIsLoading(true);
    const bookingData: BookingFormData = { vehicleId, startDate, endDate };

    try {
      await createBooking(bookingData);
      toast.success('Booking successful! Enjoy your ride.');
      // We'll create the 'My Bookings' page next
      navigate('/my-bookings'); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set today's date as the minimum for the date picker
  const today = new Date().toISOString().split('T')[0];

  if (isLoading || !vehicle) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl pt-24 pb-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vehicle Details */}
          <div>
            <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-auto rounded-lg shadow-lg object-cover" />
            <h1 className="text-3xl font-bold mt-4">{vehicle.make} {vehicle.model}</h1>
            <p className="text-xl text-muted-foreground">{vehicle.year}</p>
            <p className="text-3xl font-bold text-primary mt-2">${vehicle.pricePerDay} <span className="text-sm font-normal text-muted-foreground">/day</span></p>
          </div>

          {/* Booking Form */}
          <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold">Book your ride</h2>
              {/* Date Selection */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-background"
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per day</span>
                  <span>${vehicle.pricePerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of days</span>
                  <span>{calculateDays(startDate, endDate)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-border">
                  <span>Total Price</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
              >
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}