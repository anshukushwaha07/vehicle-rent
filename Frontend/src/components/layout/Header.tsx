// import { Link } from "react-router-dom";
// import { Search } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="w-full fixed top-0 left-0 z-50 bg-white border-b shadow-sm">
//       <div className="container mx-auto flex items-center justify-between py-4">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="font-raleway font-semibold text-2xl tracking-wide text-gray-900"
//         >
//           RENT
//         </Link>

//         {/* Navigation */}
//         <nav className="flex items-center gap-10">
//           <Link to="/" className="text-gray-700 hover:text-black">
//             Home
//           </Link>
//           <Link to="/model" className="text-gray-700 hover:text-black">
//             Model
//           </Link>
//           <Link to="/services" className="text-gray-700 hover:text-black">
//             Services
//           </Link>
//           <Link to="/gallery" className="text-gray-700 hover:text-black">
//             Gallery
//           </Link>
//         </nav>

//         {/* Search + Signup */}
//         <div className="flex items-center gap-4">
//           <button className="p-2 rounded-full hover:bg-gray-100">
//             <Search className="w-5 h-5 text-gray-900" />
//           </button>
//           <Link
//             to="/login"
//             className="border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition font-medium"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all backdrop-blur-sm ${
        scrolled
          ? "bg-white/90 shadow-md border-b"
          : "bg-white/80 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        {/* Logo */}
        <Link
          to="/"
          className="font-raleway font-semibold text-2xl tracking-wide text-primary"
        >
          RENT
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-gray-700 hover:text-primary">
            Home
          </Link>
          <Link to="/model" className="text-gray-700 hover:text-primary">
            Model
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-primary">
            Services
          </Link>
          <Link to="/gallery" className="text-gray-700 hover:text-primary">
            Gallery
          </Link>
        </nav>

        {/* Search + Signup + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-900" />
          </button>
          <Link
            to="/login"
            className="border border-primary text-primary rounded-full px-6 py-2 hover:bg-primary hover:text-white transition font-medium"
          >
            Sign Up
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 px-4 pb-4 bg-white border-t shadow-sm animate-slideDown">
          <Link to="/" className="text-gray-700 hover:text-primary w-full">
            Home
          </Link>
          <Link to="/model" className="text-gray-700 hover:text-primary w-full">
            Model
          </Link>
          <Link
            to="/services"
            className="text-gray-700 hover:text-primary w-full"
          >
            Services
          </Link>
          <Link
            to="/gallery"
            className="text-gray-700 hover:text-primary w-full"
          >
            Gallery
          </Link>
        </div>
      )}
    </header>
  );
}
