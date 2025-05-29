import React, { useEffect, useRef } from 'react';
import './Featured.css';

const Featured: React.FC = () => {
  const featuredRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (featuredRef.current) {
        const featuredSection = featuredRef.current;
        const featuredTop = featuredSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (featuredTop < windowHeight * 0.75) {
          featuredSection.classList.add('visible');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const featuredItems = [
    {
      title: 'Signature Main Course',
      description: 'Experience our chef\'s special creation',
      imagePlaceholder: 'Featured Main Dish'
    },
    {
      title: 'Artisanal Pasta',
      description: 'Handcrafted pasta with premium ingredients',
      imagePlaceholder: 'Featured Pasta'
    },
    {
      title: 'Decadent Desserts',
      description: 'Sweet endings to perfect meals',
      imagePlaceholder: 'Featured Dessert'
    },
    {
      title: 'Specialty Coffee',
      description: 'Expertly brewed to perfection',
      imagePlaceholder: 'Specialty Coffee'
    }
  ];
  
  return (
    <section id="featured" className="featured-section" ref={featuredRef}>
      <div className="container">
        <h2>Featured Dishes</h2>
        <p className="section-subtitle">Culinary delights that define our menu</p>
        
        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <div className="featured-card" key={index}>
              <div className="featured-image">
                <div className="image-placeholder">
                  <span>{item.imagePlaceholder}</span>
                </div>
              </div>
              <div className="featured-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#" className="view-button">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;