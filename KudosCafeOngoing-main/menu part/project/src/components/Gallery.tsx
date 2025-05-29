import React, { useEffect, useRef } from 'react';
import './Gallery.css';

const Gallery: React.FC = () => {
  const galleryRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const gallerySection = galleryRef.current;
        const galleryTop = gallerySection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (galleryTop < windowHeight * 0.75) {
          gallerySection.classList.add('visible');
          
          // Add staggered animation to gallery items
          const items = gallerySection.querySelectorAll('.gallery-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, 100 * index);
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const galleryItems = [
    { title: 'Katsudon', desc: 'Japanese-style breaded pork cutlet' },
    { title: 'Lechon Kawali', desc: 'Crispy deep-fried pork belly' },
    { title: 'Nachos Overload', desc: 'Loaded with cheese and toppings' },
    { title: 'Bistro Fries', desc: 'Seasoned crispy fries' },
    { title: 'Tuna Pesto', desc: 'Fresh tuna with basil pesto sauce' },
    { title: 'Nasi Goreng', desc: 'Indonesian fried rice special' },
    { title: 'Chocolate Cake', desc: 'Rich and moist chocolate layers' },
    { title: 'Tiramisu', desc: 'Classic Italian coffee-flavored dessert' },
    { title: 'Matcha Latte', desc: 'Smooth green tea with steamed milk' },
    { title: 'Fruit Smoothie', desc: 'Blend of fresh seasonal fruits' },
    { title: 'Beef Steak', desc: 'Premium cut with herb butter' },
    { title: 'Carbonara', desc: 'Creamy pasta with bacon and eggs' }
  ];
  
  return (
    <section id="gallery" className="gallery-section" ref={galleryRef}>
      <div className="gallery-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h2>Our Culinary Journey</h2>
          <p>Explore the artistry and passion behind every dish at Kudos Café & Resto</p>
        </div>
      </div>
      
      <div className="gallery-grid-container">
        <h3>Delicious Moments</h3>
        <div className="interest-grid">
          {galleryItems.map((item, index) => (
            <div className="gallery-item" key={index}>
              <div className="gallery-image">
                <div className="image-placeholder">
                  <span>{item.title}</span>
                </div>
              </div>
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;