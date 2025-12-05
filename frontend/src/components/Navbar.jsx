import './Navbar.css';

import logoImg from '../assets/smallNavbarLogo.png'; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logoImg} alt="Pimp Your Grill" className="nav-logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#best-grills">Best grills</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#register">Register</a></li>
      </ul>
    </nav>
  );
}