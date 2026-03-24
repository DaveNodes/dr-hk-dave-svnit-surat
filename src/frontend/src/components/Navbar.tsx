import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Research", path: "/research" },
  { label: "Publications", path: "/publications" },
  { label: "Students", path: "/students" },
  { label: "Connect", path: "/connect" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md shadow-lg"
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-8 h-8 rounded bg-gold flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-navy" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-display font-semibold text-base leading-tight">
                  Dr. H. K. Dave
                </p>
                <p className="text-white/60 text-xs leading-tight">
                  SVNIT Surat
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                      active ? "text-gold" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-white/80 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-navy-dark border-t border-white/10 shadow-xl md:hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/10 text-gold"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
