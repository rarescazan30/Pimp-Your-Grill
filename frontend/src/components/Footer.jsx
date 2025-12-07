import './Footer.css';

import instagramLogo from '../assets/instaLogo.svg';
import facebookLogo from '../assets/facebookLogo.svg'; 
import youtubeLogo from '../assets/youtubeLogo.png'; 
import twitchLogo from '../assets/twitchLogo.svg'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="contact-text">Contact</span>
        <div className="social-links">
          <a href="https://www.instagram.com/lsacbucuresti/" target="_blank" aria-label="Instagram">
              <img src={instagramLogo} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.facebook.com/LsacBucuresti/" target="_blank" aria-label="Facebook">
              <img src={facebookLogo} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.youtube.com/user/LSACBucuresti" target="_blank" aria-label="YouTube">
              <img src={youtubeLogo} alt="YouTube" className="social-icon" />
          </a>
          <a href="https://www.twitch.tv/lsac_bucuresti" target="_blank" aria-label="Twitch">
              <img src={twitchLogo} alt="Twitch" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
