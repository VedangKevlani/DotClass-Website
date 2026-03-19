import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Code, Users, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle Cmd/Ctrl + K shortcut to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) {
          // Can't directly toggle without state prop, so we rely on parent to listen or just handle escape here
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const quickLinks = [
    { icon: <Code size={18} />, label: "Web Development Services", path: "/services" },
    { icon: <Mail size={18} />, label: "Contact Support", path: "/contact" },
    { icon: <Users size={18} />, label: "Join Our Team", path: "/careers" },
    { icon: <FileText size={18} />, label: "About DotClass", path: "/about" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-[101] border border-gray-100"
          >
            <div className="flex items-center px-4 py-4 border-b border-gray-100">
              <Search className="text-gray-400 mr-3" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search resources, services, or pages..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="p-1 px-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition text-sm font-medium"
              >
                ESC
              </button>
            </div>

            <div className="p-4 bg-gray-50 min-h-[300px]">
              {query ? (
                <div className="py-8 text-center text-gray-500">
                  <Search className="mx-auto mb-3 opacity-20" size={40} />
                  <p>Searching for "{query}"...</p>
                  <p className="text-sm mt-1">No live database connected.</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2">Quick Links</h3>
                  <div className="flex flex-col gap-1">
                    {quickLinks.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavigate(link.path)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-left group border border-transparent hover:border-gray-100"
                      >
                        <div className="flex items-center gap-3 text-gray-600 group-hover:text-[#47BA74]">
                          {link.icon}
                          <span className="font-medium">{link.label}</span>
                        </div>
                        <ArrowRight size={16} className="text-gray-300 group-hover:text-[#47BA74] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
