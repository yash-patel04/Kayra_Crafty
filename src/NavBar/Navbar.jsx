import logo from "../assets/photos/Screenshot 2024-08-18 222313-fotor-20240823193539.jpg";
import "./CSS/Navbar.css";
import React, { useState } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa6';
import { FaBars, FaTimes, FaYoutube } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />

        {/* Hamburger Menu Button - visible only on small screens */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links - hidden on small screens, collapsible */}
        <nav className={`navbar-links ${isOpen ? "show" : ""}`}>
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        {/* Social Media Icons - visible only on larger screens */}
        <ul className="nav-list social-icons">
            <li><a href="#"><FaInstagram /></a></li>
            <li><a href="#"><FaFacebook /></a></li>
            <li><a href="#"><FaYoutube /></a></li>
          </ul>

          {/* <nav className={`navbar-links ${isOpen ? "show" : ""}`}>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        // Social Media Icons - visible only on larger screens
        <ul className="nav-list social-icons">
            <li><Link to="#"><FaInstagram /></Link></li>
            <li><Link to="#"><FaFacebook /></Link></li>
            <li><Link to="#"><FaYoutube /></Link></li>
          </ul> */}
      </div>
    </header>
  );
}

export default Navbar;
