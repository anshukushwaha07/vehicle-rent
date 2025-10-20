import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Users, Car, CalendarCheck, DollarSign } from 'lucide-react';
import { getAnalyticsData, type AnalyticsData } from '../../services/api';

// A reusable Stat Card component for the dashboard
const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
  <div className="bg-card p-6 rounded-lg border shadow-sm flex items-center gap-4">
    <div className="bg-primary/10 p-3 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await getAnalyticsData();
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-8">Could not load dashboard data.</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      {/*  Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`$${stats.revenue.totalRevenue.toLocaleString()}`} icon={DollarSign} />
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
        <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={Car} />
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={CalendarCheck} />
      </div>

      {/* Revenue Breakdown */}
      <h3 className="text-2xl font-bold mb-4">Revenue Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Revenue" value={`$${stats.revenue.dailyRevenue.toLocaleString()}`} icon={DollarSign} />
        <StatCard title="This Month" value={`$${stats.revenue.monthlyRevenue.toLocaleString()}`} icon={DollarSign} />
        <StatCard title="This Quarter" value={`$${stats.revenue.quarterlyRevenue.toLocaleString()}`} icon={DollarSign} />
        <StatCard title="This Year" value={`$${stats.revenue.yearlyRevenue.toLocaleString()}`} icon={DollarSign} />
      </div>
    </div>
  );
}