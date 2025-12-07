import { useState, useEffect } from 'react';
import './Hero.css';
import desktopImage from '../assets/homepageGrouped.png';
import mobileImage from '../assets/smallGrillsAroundLogo.svg';

export default function Hero() {
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
    <section
      className="hero"
      style={{ backgroundImage: `url(${isMobile ? mobileImage : desktopImage})` }}
    >
      <div className="hero-content">
        <div className="hero-title-main">
          <span className="pimp-your-text">Pimp Your</span>
          <span className="grill-text">GRILL</span>
        </div>
      </div>
    </section>
  );
}
