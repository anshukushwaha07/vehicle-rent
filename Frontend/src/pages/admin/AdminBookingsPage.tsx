import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAllBookings } from '../../services/api';
import type { Booking } from '../../types';

// Helper to format dates for readability
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper for styling the status badges
const getStatusClass = (status: Booking['status']) => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await getAllBookings();
        setBookings(response.data.bookings);
      } catch (error) {
        toast.error('Failed to fetch bookings.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
        Manage Bookings
      </h2>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Dates</th>
              <th className="p-4 font-medium">Total Price</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map(booking => (
                <tr key={booking._id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="p-4 align-top">
                    <div className="font-medium text-foreground">{booking.user.name}</div>
                    <div className="text-xs text-muted-foreground">{booking.user.email}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-medium text-foreground">{booking.vehicle.make} {booking.vehicle.model}</div>
                    <div className="text-xs text-muted-foreground capitalize">{booking.vehicle.type}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="text-sm text-foreground">{formatDate(booking.startDate)}</div>
                    <div className="text-xs text-muted-foreground">to</div>
                    <div className="text-sm text-foreground">{formatDate(booking.endDate)}</div>
                  </td>
                  <td className="p-4 align-top font-medium text-foreground">
                    ${booking.totalPrice.toLocaleString()}
                  </td>
                  <td className="p-4 align-top">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusClass(booking.status)}`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-8 text-muted-foreground">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}