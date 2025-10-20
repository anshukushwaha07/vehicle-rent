import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const AdminRoute = () => {
  const { isAuthenticated, user, isLoading } = useAuth(); 

  // If the authentication state is still loading, show a loading message
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Check for authentication and admin role
  if (isAuthenticated && user?.role === 'admin') {
    return <Outlet />; // If authorized, render the child routes (e.g., the admin dashboard)
  } else {
    // If not authorized, redirect them to the home page
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;