import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Users, Car, CalendarCheck, DollarSign, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// Import recharts components
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// Import the new API functions and types
import { getAnalyticsData, getAllBookings, type AnalyticsData, type Booking } from '../../services/api';

const StatCard = ({ title, value, icon: Icon, change }: { title: string; value: string | number; icon: React.ElementType; change?: string }) => (
  <div className="bg-card p-6 rounded-xl border shadow-sm flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
    <div className="mt-2">
      <p className="text-3xl font-bold">{value}</p>
      {change && (
        <p className="text-xs text-green-500 flex items-center gap-1">
          <ArrowUpRight className="h-4 w-4" /> {change}
        </p>
      )}
    </div>
  </div>
);

// New Chart Component for Revenue 
const RevenueChart = ({ data }: { data: AnalyticsData['revenue'] }) => {
  const chartData = [
    { name: 'Today', Revenue: data.dailyRevenue },
    { name: 'This Month', Revenue: data.monthlyRevenue },
    { name: 'This Quarter', Revenue: data.quarterlyRevenue },
    { name: 'This Year', Revenue: data.yearlyRevenue },
  ];

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Tooltip cursor={{ fill: 'rgba(235, 240, 255, 0.5)' }} formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component for Recent Bookings
const RecentBookings = ({ bookings }: { bookings: Booking[] }) => (
  <div className="bg-card p-6 rounded-xl border shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Recent Bookings</h3>
      <Link to="/admin/bookings" className="text-sm font-medium text-primary hover:underline">View all</Link>
    </div>
    <div className="space-y-4">
      {bookings.slice(0, 5).map(booking => ( // Show the 5 most recent
        <div key={booking._id} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
            {booking.user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-sm">{booking.user.name}</p>
            <p className="text-xs text-muted-foreground">{booking.vehicle.make} {booking.vehicle.model}</p>
          </div>
          <p className="ml-auto font-semibold text-sm">${booking.totalPrice}</p>
        </div>
      ))}
    </div>
  </div>
);


export default function AdminDashboard() {
  const [stats, setStats]  = useState<AnalyticsData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch both analytics and bookings at the same time
        const [statsResponse, bookingsResponse] = await Promise.all([
          getAnalyticsData(),
          getAllBookings()
        ]);
        setStats(statsResponse.data);
        setBookings(bookingsResponse.data.bookings);
      } catch (error) {
        toast.error('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-8 text-center">Could not load dashboard data.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">An overview of your rental business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${stats.revenue.totalRevenue.toLocaleString()}`} icon={DollarSign} change="+20.1% from last month" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} change="+150 this month" />
        <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={Car} />
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={CalendarCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={stats.revenue} />
        </div>
        <div>
          <RecentBookings bookings={bookings} />
        </div>
      </div>
    </div>
  );
}