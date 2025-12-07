import './PeterAndGrills.css';
import { useState, useEffect } from 'react';
import desktopImage from '../assets/petergratareGrouped.png';
import mobileImage from '../assets/smallPeterAndGrills.svg';

export default function Showcase() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handleResize = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handleResize);
      return () => mq.removeEventListener('change', handleResize);
    } else {
      mq.addListener(handleResize);
      return () => mq.removeListener(handleResize);
    }
  }, []);

  return (
    <section className="showcase-container">
      <div className="peter-section">
        <img 
          src={isMobile ? mobileImage : desktopImage} 
          alt="Peter Griffin" 
          className="peter-image" 
        />
      </div>
    </section>
  );
}
