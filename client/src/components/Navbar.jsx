import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Features', href: '/features' },
    { name: 'Help', href: '/help' },
    { name: 'Experience', href: '/experience' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-md shadow-2xl' 
          : 'bg-gray-600 backdrop-blur-lg shadow-4xl bg-opacity-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
            <a href="/" className="flex items-center group">
              <span className={`text-2xl font-bold transition-all duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-blue-500`}>
                   <img 
      src="/images/logo.png" 
      alt="IgaThrive Logo" 
      className={`w-35 h-40 transition-all duration-300 ${
        isScrolled ? 'filter brightness-0' : 'filter brightness-200'
      } group-hover:filter brightness-100`} 
    />
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveLink(link.name)}
                onMouseLeave={() => setActiveLink('')}
                className={`relative text-md font-medium transition-all duration-300 hover:text-blue-500 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300 ${
                  activeLink === link.name ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </a>
            ))}

            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className={`px-4 py-2 rounded-md text-md font-medium transition-all duration-300 transform hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-900' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 rounded-md text-md font-medium bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
              >
                Register
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 transform hover:scale-110 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } hover:text-blue-500 focus:outline-none`}
            >
              {isOpen ? (
                <X className="block h-6 w-6 transform transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="block h-6 w-6 transform transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden fixed inset-0 bg-gray-900 backdrop-blur-lg transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-5'
        }`}
        style={{ top: '80px' }}
      >
        <div className=" bg-slate-50 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 transition-all duration-300 hover:text-blue-500 hover:bg-gray-50 hover:pl-6"
            >
              {link.name}
            </a>
          ))}
          <div className="mt-6 space-y-3 px-3">
            <a
              href="/login"
              className="block w-full px-4 py-3 text-center rounded-md text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg border border-blue-700 "
            >
              Login
            </a>
            <a
              href="/register"
              className="block w-full px-4 py-3 text-center rounded-md bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:translate-y-[-2px]"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
