import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black dark:bg-black text-gray-400 relative overflow-hidden">
      {/* Star decoration */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            size={4}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10" />

      <div className="relative max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            ROMANVIKI
          </h2>
          <p className="text-sm">
            Navigating the digital cosmos with innovative design.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Home Base
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Our Mission
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Station
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-300">
              <Mail size={16} />
              <span>transmit@romanviki.com</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-300">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-300">
              <MapPin size={16} />
              <span>Sector 7, Digital Space Station</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Join Our Universe
          </h3>
          <p className="text-sm mb-4">
            Subscribe to receive transmissions from digital space.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Your email coordinates"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Launch Subscription
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {currentYear} ROMANVIKI. All rights reserved across the digital
            universe.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm hover:text-purple-400 transition-colors duration-300"
            >
              Privacy Protocol
            </a>
            <a
              href="#"
              className="text-sm hover:text-purple-400 transition-colors duration-300"
            >
              Terms of Operation
            </a>
            <a
              href="#"
              className="text-sm hover:text-purple-400 transition-colors duration-300"
            >
              Data Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
