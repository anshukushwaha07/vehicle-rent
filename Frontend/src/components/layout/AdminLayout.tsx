import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Car, CalendarDays } from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', text: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/vehicles', text: 'Vehicles', icon: Car },
  { to: '/admin/bookings', text: 'Bookings', icon: CalendarDays },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-card border-r p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end 
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive ? 'bg-primary/10 text-primary' : ''
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </NavLink>
          ))}
        </nav>
      </aside>

      
      <div className="flex-1">
        
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}