import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const Footer = () => {

  const size = 30;
  return (
    <footer className="bg-dark text-light p-4 ">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Site Map</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p>Bob's Garage</p>
              <p>123 Main Street</p>
              <p>City, State ZIP</p>
              <p>Email: info@bobsgarage.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#"><FaFacebook size={size}/></a>
              </li>
              <li className="list-inline-item">
                <a href="#"><a href="#"><FaTwitter size={size}/></a></a>
              </li>
              <li className="list-inline-item">
                <a href="#"><a href="#"><FaLinkedin size={size}/></a></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
