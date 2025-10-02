import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeProvider";

// Define navigation links in an array for easier management
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#models", label: "Models" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeTheme = theme === "dark" ? "dark" : "light";

  // Simplified theme switcher function
  const switchTheme = (value: "light" | "dark") => {
    setTheme(value);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="text-2xl font-bold tracking-[0.3em] text-primary"
        >
          VROOM
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-border p-1 text-xs font-semibold md:flex">
            <button
              onClick={() => switchTheme("light")}
              className={`rounded-full px-3 py-1 transition-colors ${
                activeTheme === "light"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => switchTheme("dark")}
              className={`rounded-full px-3 py-1 transition-colors ${
                activeTheme === "dark"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dark
            </button>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-full border border-border p-2 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-6 mb-4 flex flex-col gap-3 rounded-2xl border border-border bg-card/90 px-4 py-4 text-sm font-medium backdrop-blur">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex rounded-full border border-border p-1 text-xs font-semibold">
            <button
              onClick={() => switchTheme("light")}
              className={`flex-1 rounded-full px-3 py-1 transition-colors ${
                activeTheme === "light"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => switchTheme("dark")}
              className={`flex-1 rounded-full px-3 py-1 transition-colors ${
                activeTheme === "dark"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dark
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
