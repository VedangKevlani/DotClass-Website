import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, UserCircle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SearchModal from "./SearchModal";
import AlertsDropdown from "./AlertsDropdown";

/* -------------------------------------------------------
   Menu Configuration (Extensible)
------------------------------------------------------- */

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

/* -------------------------------------------------------
   Component
------------------------------------------------------- */

export default function EliteNavbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ---------------- Scroll Detection ---------------- */

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Keyboard shortcut listener for Search Modal
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-white shadow-sm h-20"
          : "bg-white backdrop-blur-2xl h-24 border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-10">

        {/* ================= Logo ================= */}

        <div className="flex items-center gap-3 group cursor-pointer">
          <motion.div
            animate={{
              boxShadow: scrolled
                ? "0 0 0px rgba(71,186,116,0)"
                : "0 0 18px rgba(71,186,116,0.6)",
              backgroundColor: scrolled
                ? "rgba(71,186,116,0)"
                : "rgba(71,186,116,0.12)",
            }}
            transition={{ duration: 0.5 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[#47BA74] font-bold"
          >
          </motion.div>

          <span className="font-semibold tracking-tight text-lg">
            <img src="/assets/logo.png" alt="DotClass Logo" className="h-10" />
          </span>
        </div>

        {/* ================= Menu ================= */}

        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-600">
          {MENU_ITEMS.map((item) => {
            const active =
              location.pathname === item.path ||
              (item.path === "/" && location.pathname === "/");

            return (
              <Link to={item.path} key={item.label} className="relative">
                <motion.span
                  whileHover={{ y: -2 }}
                  className={clsx(
                    "cursor-pointer transition-all",
                    active
                      ? "text-[#47BA74] font-semibold"
                      : "hover:text-[#47BA74]"
                  )}
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        {/* ================= Right Controls ================= */}

        {/* ================= Right Controls ================= */}

        <div className="flex items-center gap-3 md:gap-5">

          {/* Command Search Hint (Desktop Only) */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border bg-gray-50 cursor-pointer hover:border-[#47BA74] hover:bg-white transition"
          >
            <Search size={16} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">
              Search <span className="mx-1 px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">Ctrl K</span>
            </span>
          </div>

          {/* Mobile Search Icon (Small screens) */}
          <div 
             onClick={() => setIsSearchOpen(true)}
             className="flex lg:hidden w-10 h-10 rounded-xl border items-center justify-center cursor-pointer hover:border-[#47BA74] bg-white transition"
          >
            <Search size={18} className="text-gray-500" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <div 
              onClick={() => setIsAlertsOpen(!isAlertsOpen)}
              className="w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer group hover:border-[#47BA74] bg-white transition"
            >
              <Bell
                size={20}
                className="text-gray-500 group-hover:text-[#47BA74]"
              />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#47BA74] rounded-full border border-white" />
            </div>
            <AlertsDropdown isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
          </div>

          {/* Profile Workspace Button (Hidden on Mobile, moved to menu) */}
          <Link to="/profile" className="hidden sm:flex">
            <div className="w-10 h-10 rounded-xl border flex items-center justify-center hover:border-[#47BA74] hover:bg-gray-50 bg-white shadow-sm transition cursor-pointer">
              <UserCircle size={20} className="text-gray-500" />
            </div>
          </Link>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl border flex items-center justify-center hover:border-[#47BA74] bg-white transition"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* ================= Mobile Navigation Drawer ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[60] md:hidden flex flex-col pt-24 px-8 pb-10"
            >
              <nav className="flex flex-col gap-6 mb-12">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "text-lg font-medium transition-colors",
                      location.pathname === item.path ? "text-[#47BA74]" : "text-gray-600"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4 border-t border-gray-100 pt-8">
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-medium"
                >
                  <UserCircle size={20} />
                  Profile Workspace
                </Link>
                <button 
                  onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 text-gray-500"
                >
                  <Search size={20} />
                  Search Site
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}