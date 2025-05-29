import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    
    // Determine active section based on scroll position
    const sections = ['home', 'about', 'featured', 'gallery', 'reviews'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrollPosition > 50 ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <div className="logo-wrapper">
            {/* Placeholder for logo - using Lucide React icon as requested */}
            <div className="logo-placeholder">
              <Menu size={40} color="white" />
            </div>
          </div>
          <h1 className="restaurant-title">Kudos Café & Resto</h1>
        </div>
        
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => handleNavClick('home')}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={() => handleNavClick('about')}
          >
            About
          </a>
          <a 
            href="#featured" 
            className={activeSection === 'featured' ? 'active' : ''}
            onClick={() => handleNavClick('featured')}
          >
            Featured
          </a>
          <a 
            href="#gallery" 
            className={activeSection === 'gallery' ? 'active' : ''}
            onClick={() => handleNavClick('gallery')}
          >
            Gallery
          </a>
          <a 
            href="#reviews" 
            className={activeSection === 'reviews' ? 'active' : ''}
            onClick={() => handleNavClick('reviews')}
          >
            Reviews
          </a>
        </nav>
        
        <button className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
        </button>
      </div>
    </header>
  );
};

export default Header;