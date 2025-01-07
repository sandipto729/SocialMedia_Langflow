import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'; 

// Enhanced Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//   const scrollToSection = (sectionId) => {
//   setIsMenuOpen(false);
//   const element = document.getElementById(sectionId);

//   if (!element) {
//     console.error(`Element with id "${sectionId}" not found`);
//     return;
//   }

//   const headerOffset = 80;
//   const elementPosition = element.getBoundingClientRect().top;
//   const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//   window.scrollTo({
//     top: offsetPosition,
//     // behavior: "smooth",
//   });
// };


  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold text-primary-600 cursor-pointer flex gap-4 justify-center items-center">
            <img src="/404 Found.svg" alt="Logo" className="h-10" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <HashLink smooth to='/home#features'
              
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </HashLink>
            <HashLink smooth to='/home#team'
              
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Team
            </HashLink>
            <HashLink smooth to='/home#contact'
              
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </HashLink>
            <Link to='/login'
              className="text-gray-600 hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link
              to="/dashboard"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Link
            to="/dashboard"
            className="md:hidden bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ArrowRight size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
