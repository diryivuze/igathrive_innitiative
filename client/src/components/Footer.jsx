import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  ArrowRight,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white">Subscribe to Our Newsletter</h3>
              <p className="mt-1 text-sm">Stay updated with our latest courses and offerings</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-auto">
              <div className="flex max-w-md mx-auto md:mx-0 mr-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 bg-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
                >
                  Send
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">IgaThrive</h3>
            <p className="text-sm leading-relaxed">
              Empowering individuals with professional IT skills and knowledge through 
              comprehensive online courses and practical training programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                'About',
                'Contact',
                'Features',
                'Help',
               ' Experience'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-sm hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 text-blue-400" />
                <span className="text-sm">123 Main St, Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0 text-blue-400" />
                <a 
                  href="mailto:info@igathrive.com" 
                  className="text-sm hover:text-blue-400 transition-colors duration-300"
                >
                  info@igathrive.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0 text-blue-400" />
                <a 
                  href="tel:++250780162164" 
                  className="text-sm hover:text-blue-400 transition-colors duration-300"
                >
                  +250 780 162 164
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Twitter, href: 'https://www.instagram.com/igathrive_rwanda/', color: 'hover:text-blue-400' },
                { icon: Instagram, href: 'https://www.instagram.com/igathrive_rwanda/', color: 'hover:text-pink-500' },
                { icon: Linkedin, href: 'https://www.instagram.com/igathrive_rwanda/', color: 'hover:text-blue-600' },
                { icon: Youtube, href: 'https://www.instagram.com/igathrive_rwanda/', color: 'hover:text-red-500' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`bg-gray-800 p-2 rounded-full transition-all duration-300 hover:scale-110 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            {/* Additional Trust Indicators */}
            {/* <div className="mt-6">
              <p className="text-sm font-medium text-white mb-2">We Accept</p>
              <div className="flex gap-2">
                {['Visa', 'Mastercard', 'PayPal'].map((payment) => (
                  <span 
                    key={payment}
                    className="px-3 py-1 bg-gray-800 rounded text-xs"
                  >
                    {payment}
                  </span>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} IgaThrive. All Rights Reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
              <a href="/sitemap" className="hover:text-blue-400 transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;