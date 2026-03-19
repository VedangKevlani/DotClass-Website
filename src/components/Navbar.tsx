import { motion } from "framer-motion";

export default function Navbar() {
  const menuItems = [
    "Home",
    "About Us",
    "Services",
    "Careers",
    "Contact Us",
  ];

  const active = "Contact Us";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 h-20">

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#47BA74]/20 flex items-center justify-center">
            <span className="text-[#47BA74] font-bold">DC</span>
          </div>

          <span className="font-semibold text-lg tracking-tight">
            <img src="dotclasslogo.png" alt="DotClass Logo" className="h-6" />
            {/* <h2>Technology Solutions</h2> */}
          </span>
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">

          {menuItems.map((item) => {
            const isActive = item === active;

            return (
              <motion.span
                key={item}
                whileHover={{ y: -2 }}
                className={`
                  cursor-pointer transition-all relative
                  ${isActive ? "text-[#47BA74] font-semibold" : "hover:text-[#47BA74]"}
                `}
              >
                {item}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#47BA74] rounded-full" />
                )}
              </motion.span>
            );
          })}
        </div>

      </div>
    </nav>
  );
}