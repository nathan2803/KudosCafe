import React, { useEffect, useRef } from 'react';
import './About.css';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const aboutSection = aboutRef.current;
        const aboutTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (aboutTop < windowHeight * 0.75) {
          aboutSection.classList.add('visible');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="about-header parallax-bg">
        <div className="overlay"></div>
        <div className="container">
          <h2>About Us</h2>
          <p className="subtitle">Experience excellence in every bite</p>
        </div>
      </div>
      
      <div className="about-content">
        <div className="about-left">
          <div className="about-image main-image">
            {/* Placeholder for main image */}
            <div className="image-placeholder">
              <span>Restaurant Interior</span>
            </div>
          </div>
          
          <div className="about-info-card">
            <h3>Kudos Café & Resto</h3>
            <div className="opening-hours">
              <span className="label">Opening Hours:</span>
              <p>Monday - Friday: 9AM - 10PM</p>
              <p>Saturday - Sunday: 10AM - 11PM</p>
            </div>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        
        <div className="about-right">
          <div className="about-text">
            <div className="highlight-paragraph">
              <p>Established in 2020, Kudos Café & Resto emerged from a passion for creating the perfect blend of casual dining and specialty coffee culture. Our journey began with a simple vision: to provide a warm, welcoming space where quality food meets exceptional coffee.</p>
            </div>
            
            <div className="highlight-paragraph">
              <p>Our skilled chefs craft each dish with precision and care, using locally-sourced ingredients whenever possible. From hearty breakfast options to sophisticated dinner entrées, every item on our menu tells a story of culinary excellence.</p>
            </div>
            
            <div className="highlight-paragraph">
              <p>The ambiance at Kudos Café & Resto reflects our commitment to creating a versatile space - comfortable enough for a casual breakfast, yet sophisticated enough for a romantic dinner.</p>
            </div>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-image">
                <div className="image-placeholder">
                  <span>Quality Ingredients</span>
                </div>
              </div>
              <div className="benefit-content">
                <h4>Quality Ingredients</h4>
                <p>We source the finest local ingredients</p>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-image">
                <div className="image-placeholder">
                  <span>Expert Chefs</span>
                </div>
              </div>
              <div className="benefit-content">
                <h4>Expert Chefs</h4>
                <p>Crafted by culinary professionals</p>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-image">
                <div className="image-placeholder">
                  <span>Perfect Ambiance</span>
                </div>
              </div>
              <div className="benefit-content">
                <h4>Perfect Ambiance</h4>
                <p>Designed for your comfort</p>
              </div>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-image">
                <div className="image-placeholder">
                  <span>Great Service</span>
                </div>
              </div>
              <div className="benefit-content">
                <h4>Great Service</h4>
                <p>Customer satisfaction guaranteed</p>
              </div>
            </div>
          </div>
          
          <div className="commitment-section">
            <p className="commitment-text">We're committed to sustainable practices and community engagement, partnering with local producers to deliver fresh, seasonal ingredients while maintaining eco-friendly operations throughout our establishment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;