import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  Sun,
  Moon,
  ArrowLeft,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', text: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/vehicles', text: 'Vehicles', icon: Car },
  { to: '/admin/bookings', text: 'Bookings', icon: CalendarDays },
];

export default function AdminLayout() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme in localStorage or user's OS preference
    const prefersDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    // Apply the theme to the <html> element
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/*  Sidebar  */}
      <aside className="w-64 bg-card border-r border-border p-4 hidden md:flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-tight">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end // 'end' prop ensures only the exact path is active
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive ? 'bg-primary/10 text-primary font-medium' : ''
                  }`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.text}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* "Back to Site" Link */}
        <div className="mt-auto">
          <Link
            to="/vehicles" // Links to your main vehicle page
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col">
        {/* --- Admin Header with Theme Toggle --- */}
        <header className="flex justify-end items-center p-4 h-16 border-b border-border bg-card">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-secondary p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
}