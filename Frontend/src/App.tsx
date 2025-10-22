import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VehiclesPage from './pages/VehiclesPage';
import AdminRoute from './components/router/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/DashboardPage';
import AdminVehiclesPage from './pages/admin/VehiclesPage';
import AdminVehicleFormPage from './pages/admin/AdminVehicleFormPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import ProtectedRoute from './components/router/ProtectedRoute'; 
import BookingPage from './pages/BookingPage'; 
import MyBookingsPage from './pages/MyBookingsPage';


function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/booking/:vehicleId" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Route>

     
      <Route element={<AdminRoute />}>        
        <Route path="/admin" element={<AdminLayout />}>        
          <Route index element={<AdminDashboard />} />
          <Route path="vehicles" element={<AdminVehiclesPage />} />
          <Route path="vehicles/add" element={<AdminVehicleFormPage />} />
          <Route path="vehicles/edit/:id" element={<AdminVehicleFormPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;