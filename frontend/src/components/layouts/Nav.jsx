import { Link } from "react-router-dom";
import { loginAsync, isAuth, logout } from '../../../reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Nav = () => {
  const isAuthentciated = useSelector(isAuth)
  const dispatch = useDispatch();
  console.log(isAuthentciated);
  const handleLogout = () =>{
     dispatch(logout())
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Bobs Garage</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about_us">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/our-work">Our Work</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/testimonials">Testimonials</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq">FAQ</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog">Blog</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/customer-account">Customer Account</a>
            </li>
            <li className="nav-item">
              {isAuthentciated?  <button
                  className="btn btn-danger btn-sm p-2 text-light "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Logout
                </button> : <Link className="nav-link" to="/login">Login</Link>}
            </li>
            {!isAuthentciated && (<li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>)}
          </ul>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">Are you sure you want to logout?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button onClick={handleLogout} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
