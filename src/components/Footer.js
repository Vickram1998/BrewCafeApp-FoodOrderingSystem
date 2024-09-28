import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Contact Us: 123-456-7890 | brew@example.com</p>
      <nav className='Footer-nav'>
        <Link to="/">Home</Link> | 
        <Link to="/menu">Menu</Link> | 
        <Link to="/about">About</Link>
      </nav>
      <div className="social-media">
        <a href="#!">Instagram</a> | <a href="#!">Facebook</a> | <a href="#!">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
