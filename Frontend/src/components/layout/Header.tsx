import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../contexts/AuthContext"; 

// Define navigation links
const navLinks = [
  { href: "/vehicles", label: "Vehicles" },
  { href: "/drive", label: "Drive" },
  { href: "/business", label: "Business" },
  { href: "/help", label: "Help" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); //  Get auth state and functions
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home after logout
  };
  
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700/50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          MatteCar
        </Link>

        {/*  DESKTOP NAV  */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/*  AUTH CONTROLS */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            // Logged-In View 
            <>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            //  Logged-Out View 
            <>
              <Link to="/login" className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">
                Sign up
              </Link>
            </>
          )}

          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/*  MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-b">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 sm:hidden">
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}