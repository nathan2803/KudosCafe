import React, { useEffect } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      const heroSection = document.querySelector('.hero-section') as HTMLElement;
      
      if (heroContent && heroSection) {
        // Parallax effect
        heroSection.style.backgroundPositionY = `${scrollY * 0.5}px`;
        
        // Fade out effect
        const opacity = Math.max(1 - scrollY / 700, 0);
        heroContent.style.opacity = opacity.toString();
        
        // Scale effect
        const scale = Math.max(1 - scrollY / 2000, 0.8);
        heroContent.style.transform = `scale(${scale})`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Kudos Café & Resto</h1>
        <p>Experience the perfect blend of taste and ambiance</p>
        <a href="#featured" className="cta-button">Explore Our Menu</a>
      </div>
    </section>
  );
};

export default Hero;