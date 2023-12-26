import { Link, useNavigate } from "react-router-dom";
import { isAuth, logout } from '../../../reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from '../../../reducers/ThemeSlice';

const Nav = () => {
  const theme = useSelector(selectTheme);
  const isAuthentciated = useSelector(isAuth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
     dispatch(logout())
     navigate("/login")
     window.location.reload(true);
  }

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
      <div className="container">
        <Link className="navbar-brand text-white " to="/">Bobs Garage</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about_us">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/testimonials">Testimonials</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/faq">FAQ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/privacy-policy">Privacy Policy</Link>
            </li>
            {isAuthentciated && (<li className="nav-item">
              <Link className="btn btn-outline-info mx-2 text-white" to="/customer-account">My Account</Link>
            </li>)}
            <li className="nav-item text-white">
              {isAuthentciated?  <button
                  className="btn btn-outline-danger btn-sm p-2 text-light "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Logout
                </button> : <Link className="nav-link text-white" to="/login">Login</Link>}
            </li>
            {!isAuthentciated && (<li className="nav-item text-white">
              <Link className="nav-link text-white" to="/register">Register</Link>
            </li>)}

            <li>
            <button className="btn btn-outline-light  mx-2" onClick={toggleDarkMode}>
                   {theme === "light" ? "Dark" : "Light"} Mode
            </button>
            </li>
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
