import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

import logoImg from '../assets/smallNavbarLogo.png'; 

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  // confirmare log out
  const handleLogout = (e) => {
    e.preventDefault();
    
    const isConfirmed = window.confirm("Ești sigur că vrei să te deconectezi?");
    
    if (isConfirmed) {
        logout();
        navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
            <img src={logoImg} alt="Pimp Your Grill" className="nav-logo" />
        </Link>
      </div>
      
      <ul className="nav-links">
        {user ? (
          <>
            <li>
                <Link to="/profile" className={location.pathname === '/profile'
                || location.pathname === '/post-grill' ? 'active-link' : ''}>
                    Profile
                </Link>
            </li>
            <li>
                <Link to="/best-grills" className={getLinkClass('/best-grills')}>
                    Best grills
                </Link>
            </li>
            <li>
                <a href="/" onClick={handleLogout} className="btn-register">
                    Log Out
                </a>
            </li>
          </>
        ) : (
          <>
            <li>
                <Link to="/best-grills" className={getLinkClass('/best-grills')}>
                    Best grills
                </Link>
            </li>
            <li>
                <Link to="/login" className={getLinkClass('/login')}>
                    Log in
                </Link>
            </li>
            <li>
                <Link to="/register" className={`btn-register ${getLinkClass('/register')}`}>
                    Register
                </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}