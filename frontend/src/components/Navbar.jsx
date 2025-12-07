import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import { useState, useEffect } from 'react';
import logoImg from '../assets/smallNavbarLogo.png';
import phoneLogo from '../assets/PhoneNavbarLogo.svg';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const getLinkClass = (path) => location.pathname === path ? 'active-link' : '';

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Ești sigur că vrei să te deconectezi?")) {
        logout();
        navigate('/');
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img 
            src={isMobile ? phoneLogo : logoImg} 
            alt="Pimp Your Grill" 
            className="nav-logo" 
          />
        </Link>
      </div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {user ? (
          <>
            <li>
              <Link 
                to="/profile" 
                className={location.pathname === '/profile' || location.pathname === '/post-grill' ? 'active-link' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link 
                to="/best-grills" 
                className={getLinkClass('/best-grills')}
                onClick={() => setMenuOpen(false)}
              >
                Best grills
              </Link>
            </li>
            <li>
              <a 
                href="/" 
                onClick={handleLogout} 
                className="btn-register"
              >
                Log Out
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link 
                to="/best-grills" 
                className={getLinkClass('/best-grills')}
                onClick={() => setMenuOpen(false)}
              >
                Best grills
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className={getLinkClass('/login')}
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className={`btn-register ${getLinkClass('/register')}`}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}
