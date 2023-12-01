import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
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
                <Link className='text-light' to="/">Home</Link>
              </li>
              <li>
                <Link className='text-light' to="/about_us">About Us</Link>
              </li>
              <li>
                <Link className='text-light' to="/services">Services</Link>
              </li>
              <li>
                <Link className='text-light' to="/login">Login</Link>
              </li>
              <li>
                <Link className='text-light' to="/register">Register</Link>
              </li>
              <li>
                <Link className='text-light' to="/blog">Blog</Link>
              </li>
              <li>
                <Link className='text-light' to="/services">Services</Link>
              </li>
              <li>
                <Link className='text-light' to="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link className='text-light' to="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link className='text-light' to="/faq">FAQ</Link>
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
                <Link className='text-light' to="#"><FaFacebook size={size}/></Link>
              </li>
              <li className="list-inline-item">
                <Link className='text-light' to="#"><a to="#"><FaInstagram size={size}/></a></Link>
              </li>
              <li className="list-inline-item">
                <Link className='text-light' to="#"><FaLinkedin size={size}/></Link>
              </li>
              <li className="list-inline-item">
                <Link className='text-light' to="#"><FaTwitter size={size}/></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
