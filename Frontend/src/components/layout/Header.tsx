import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

// Define navigation links in an array for easier management
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/model", label: "Models" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // FIXED: Use useRef to track last scroll position to avoid stale state in the event listener
  const lastScrollYRef = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  // FIXED: The controlHeader logic is updated to use the ref
  const controlHeader = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    // Set a timeout to make the header visible when scrolling stops
    scrollTimeout.current = window.setTimeout(() => {
      setVisible(true);
    }, 200);

    // Update the ref with the new scroll position
    lastScrollYRef.current = currentScrollY;
  }, []); // FIXED: Dependency array is now empty

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [controlHeader]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (menuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen, isSearchOpen]);

  const navLinkClasses =
    "text-muted-foreground hover:text-primary transition-colors duration-300";
  const activeNavLinkClasses = "text-primary font-semibold";

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 pt-6 md:pt-8 transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl shadow-sm flex items-center justify-between py-4 px-6 md:px-8">
          <div
            className={`flex-1 flex items-center justify-start transition-opacity duration-300 ${
              isSearchOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-bold text-2xl tracking-[0.2em] text-primary"
            >
              VROOM
            </Link>
          </div>

          <nav
            className={`hidden md:flex items-center gap-8 lg:gap-10 transition-opacity duration-300 ${
              isSearchOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div
            className={`flex-1 flex items-center justify-end gap-2 sm:gap-4 transition-opacity duration-300 ${
              isSearchOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            <button
              aria-label="Open Search"
              className="p-2.5 border rounded-full hover:bg-accent transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5 text-primary" />
            </button>

            {/* ADDED: Log In button */}
            <Link
              to="/login"
              className="hidden sm:block text-primary rounded-full px-6 py-2.5 hover:bg-accent transition font-medium text-sm"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="hidden sm:block bg-primary text-primary-foreground rounded-full px-6 py-2.5 hover:bg-primary/90 transition font-medium text-sm"
            >
              Sign Up
            </Link>

            <button
              className="md:hidden p-2 rounded-full hover:bg-accent"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>

          <div
            className={`absolute inset-0 flex items-center px-6 transition-opacity duration-300 ${
              isSearchOpen
                ? "opacity-100 z-20"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-full flex items-center bg-accent/80 rounded-full">
              <span className="pl-4 pr-2">
                <Search className="w-5 h-5 text-muted-foreground" />
              </span>
              <input
                type="text"
                placeholder="Search for a vehicle..."
                className="w-full bg-transparent outline-none border-none py-3 text-base text-foreground"
                autoFocus
              />
              <button
                aria-label="Close Search"
                className="p-3 rounded-full hover:bg-muted/80 transition-colors"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`
            absolute top-full left-0 w-full mt-2 transition-all duration-300 ease-in-out md:hidden
            ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-lg mx-4 p-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-accent"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="my-2 border-border" />

              {/* ADDED: Log In button for mobile menu */}
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center border border-primary text-primary rounded-lg px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primary text-primary-foreground rounded-lg px-6 py-3 hover:bg-primary/90 transition font-medium"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
