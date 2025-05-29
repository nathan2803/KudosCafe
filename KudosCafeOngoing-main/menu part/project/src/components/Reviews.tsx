import React, { useEffect, useRef } from 'react';
import './Reviews.css';

const Reviews: React.FC = () => {
  const reviewsRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (reviewsRef.current) {
        const reviewsSection = reviewsRef.current;
        const reviewsTop = reviewsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (reviewsTop < windowHeight * 0.75) {
          reviewsSection.classList.add('visible');
          
          // Add staggered animation to review cards
          const cards = reviewsSection.querySelectorAll('.review-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, 150 * index);
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
  
  const reviews = [
    {
      title: "Cozy Atmosphere",
      text: "The ambiance is perfect for both casual meetups and business meetings. Their coffee selection is outstanding!",
      rating: 5
    },
    {
      title: "Delicious Pasta",
      text: "Their homemade pasta dishes are absolutely amazing. The sauce is perfectly balanced!",
      rating: 4
    },
    {
      title: "Great Service",
      text: "The staff is incredibly friendly and attentive. They make you feel right at home!",
      rating: 4.5
    },
    {
      title: "Best Desserts",
      text: "The dessert menu is to die for! Their cakes are freshly baked and absolutely delicious.",
      rating: 4
    },
    {
      title: "Perfect Brunch Spot",
      text: "Their weekend brunch menu is exceptional. The eggs benedict is a must-try!",
      rating: 3
    },
    {
      title: "Amazing Coffee",
      text: "As a coffee enthusiast, I'm impressed by their specialty coffee selection and skilled baristas!",
      rating: 5
    }
  ];
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <section id="reviews" className="reviews-section" ref={reviewsRef}>
      <div className="container">
        <h2>What Our Customers Say</h2>
        <p className="section-subtitle">Read about experiences from our valued guests</p>
        
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-image">
                <div className="image-placeholder">
                  <span>Customer {index + 1}</span>
                </div>
              </div>
              <div className="review-content">
                <h3>{review.title}</h3>
                <p>"{review.text}"</p>
                <div className="rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;