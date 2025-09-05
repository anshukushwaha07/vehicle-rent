import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className=" font-raleway text-2xl font-bold text-blue-600">
          DriveHive
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link to="/cars" className="hover:text-blue-600">
            vehicles
          </Link>
          <Link to="/bookings" className="hover:text-blue-600">
            Bookings
          </Link>
          <Link to="/profile" className="hover:text-blue-600">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
