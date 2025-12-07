import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';
// 👇 Import the SVG
import arrowIcon from '../assets/ScrollToTopIcon.svg'; 

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-btn">
          <img src={arrowIcon} alt="Scroll to top" className="scroll-icon" />
        </div>
      )}
    </div>
  );
}