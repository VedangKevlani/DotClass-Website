import { Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import Careers from "./pages/Careers";
import AboutUs from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ProfilePage from "./pages/ProfilePage";
import EliteNavbar from "./components/EliteNavbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EliteNavbar />

      <div className="pt-24 md:pt-28">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}