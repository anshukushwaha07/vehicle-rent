// src/App.tsx
import { Routes, Route } from 'react-router-dom'; // 1. Import Outlet here
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VehiclesPage from './pages/VehiclesPage';
import AdminRoute from './components/router/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/DashboardPage';
import AdminVehiclesPage from './pages/admin/VehiclesPage';
import AdminVehicleFormPage from './pages/admin/AdminVehicleFormPage';


function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />

      {/* --- Protected Admin Routes --- */}
      <Route element={<AdminRoute />}>
        {/* This is a nested route structure */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* The index route renders at the parent's path ('/admin') */}
          <Route index element={<AdminDashboard />} />
          {/* Add more admin pages here later, e.g., */}
          <Route path="vehicles" element={<AdminVehiclesPage />} />
          <Route path="vehicles/add" element={<AdminVehicleFormPage />} />
          <Route path="vehicles/edit/:id" element={<AdminVehicleFormPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;