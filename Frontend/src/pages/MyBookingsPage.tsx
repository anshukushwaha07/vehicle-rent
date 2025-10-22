import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getMyBookings } from '../services/api';
import type { Booking } from '../types';
import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Wrench } from 'lucide-react';

// Helper to format dates for readability
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// A sub-component for a single booking card
const BookingCard = ({ booking }: { booking: Booking }) => {
  const getStatusClass = (status: Booking['status']) => {
    switch (status) {
      case 'active':
        return 'border-blue-500 bg-blue-50';
      case 'upcoming':
        return 'border-yellow-500 bg-yellow-50';
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'cancelled':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className={`flex flex-col md:flex-row border-l-4 rounded-lg bg-card border ${getStatusClass(booking.status)} shadow-sm overflow-hidden`}>
      <img
        src={booking.vehicle.imageUrl}
        alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />
      <div className="p-6 flex flex-col justify-between w-full">
        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(booking.status)} border ${getStatusClass(booking.status).replace('bg-', 'border-')}`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            {booking.vehicle.make} {booking.vehicle.model}
          </h3>
          <p className="text-sm text-muted-foreground">{booking.vehicle.year}</p>
        </div>
        <div className="border-t border-border mt-4 pt-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span className="text-sm">
              {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag size={16} />
            <span className="text-sm font-semibold text-foreground">
              Total Price: ${booking.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getMyBookings()
      .then(response => {
        setBookings(response.data.bookings);
      })
      .catch(() => {
        toast.error('Failed to fetch your bookings.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
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
        <h1 className="text-4xl font-bold tracking-tight mb-8">My Bookings</h1>
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map(booking => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-card border border-border rounded-lg">
            <Wrench size={48} className="mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold mt-4">No Bookings Yet</h3>
            <p className="text-muted-foreground mt-2">
              You haven't booked any vehicles. Why not find your next ride?
            </p>
            <Link
              to="/vehicles"
              className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
            >
              Browse Vehicles
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}