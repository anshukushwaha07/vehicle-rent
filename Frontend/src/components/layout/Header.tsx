import { useState } from "react";
import { Menu, X, User, ShieldCheck, LogOut, Settings, ChevronDown, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";

const navLinks = [
  { href: "/vehicles", label: "Vehicles" },
  { href: "/drive", label: "Drive" },
  { href: "/business", label: "Business" },
  { href: "/help", label: "Help" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useClickOutside(() => {
    setProfileMenuOpen(false);
  });

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    await logout();
    navigate('/');
  };
  
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700/50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          MatteCar
        </Link>

        {/* --- DESKTOP NAV --- */}
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

        {/* AUTH CONTROLS */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            //  Logged-In View: Profile Dropdown 
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown Toggle Button */}
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-200">
                  {user?.name}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-white dark:bg-gray-800 shadow-lg p-2 text-black dark:text-white"
                >
                  <div className="px-2 py-1.5 border-b mb-2 border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>

                  {/* --- 2. ADDED "MY BOOKINGS" LINK --- 👇 */}
                  <Link
                    to="/my-bookings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Calendar className="h-4 w-4" /> My Bookings
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="h-4 w-4" /> Profile Details
                  </Link>

                  <Link
                    to="/security"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="h-4 w-4" /> Security
                  </Link>

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin" // Your secret admin path
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <ShieldCheck className="h-4 w-4" /> Admin Panel
                    </Link>
                  )}

                  <div className="border-t my-2 border-gray-200 dark:border-gray-700"></div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // --- Logged-Out View ---
            <>
              <Link to="/login" className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">
                Sign up
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {menuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/50">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}

            {/* --- 3. ADDED USER LINKS TO MOBILE MENU --- 👇 */}
            {isAuthenticated && (
              <>
                <div className="border-t my-2 border-gray-200 dark:border-gray-700"></div>
                <Link
                  to="/my-bookings"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/management-console-x7b9" // Your secret admin path
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}

            {!isAuthenticated && (
              <a
                href="/login"
                onClick={(e) => { e.preventDefault(); navigate('/login'); setMenuOpen(false); }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-800 sm:hidden"
              >
                Log in
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}