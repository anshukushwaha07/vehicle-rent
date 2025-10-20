import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VehiclesPage from './pages/VehiclesPage';
// import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      {/* <Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
}

