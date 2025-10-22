import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    // 'replace' stops the user from pressing 'back' to the protected page
    // 'state' remembers where they were trying to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If authenticated, render the child route (e.g., the BookingPage)
  return <Outlet />;
};

export default ProtectedRoute;