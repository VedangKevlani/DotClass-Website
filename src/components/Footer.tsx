import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#47BA74]/10 text-[#47BA74] font-bold">
              <img src="/jamaica.png" alt="Jamaica Flag" className="h-8" />
            </div>
            <img src="/assets/logo.png" alt="DotClass Logo" className="h-6" />
          </div>
          <p className="text-sm text-gray-500 max-w-xs mt-2 leading-relaxed">
            We transform companies digitally. From websites and apps to automation, maintenance, and QA.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-sm text-gray-500 hover:text-[#47BA74] transition w-fit">Home</Link>
            <Link to="/about" className="text-sm text-gray-500 hover:text-[#47BA74] transition w-fit">About Us</Link>
            <Link to="/services" className="text-sm text-gray-500 hover:text-[#47BA74] transition w-fit">Services</Link>
            <Link to="/careers" className="text-sm text-gray-500 hover:text-[#47BA74] transition w-fit">Careers</Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-[#47BA74] transition w-fit">Contact Us</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3 text-sm text-gray-500">
              <MapPin size={18} className="text-[#47BA74] flex-shrink-0 mt-0.5" />
              <span>123 Tech Hub Avenue<br />Kingston, Jamaica</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500">
              <a href="tel:+18765550198" className="hover:text-[#47BA74] transition flex items-center gap-3">
                <Phone size={18} className="text-[#47BA74] flex-shrink-0" />
                <span>+1 (876) 555-0198</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500">
              <a href="mailto:contact@dotclass.io" className="hover:text-[#47BA74] transition flex items-center gap-3">
                <Mail size={18} className="text-[#47BA74] flex-shrink-0" />
                <span>contact@dotclass.io</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">© 2026 DotClass. All rights reserved.</p>
        <p className="text-sm text-gray-400 flex items-center gap-1 font-medium">Made by <span className="text-[#47BA74]">DotClass 2026</span></p>
      </div>
    </footer>
  );
}
