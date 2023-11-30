import { Link, useNavigate } from "react-router-dom";
import { isAuth, logout } from '../../../../reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  
  const navigate = useNavigate();
  const isAuthentciated = useSelector(isAuth)
  const dispatch = useDispatch();
  const handleLogout = () =>{
     dispatch(logout())
     navigate("/")
     window.location.reload(true)
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
              <Link className="nav-link" to="/admin/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/posts">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/feedbacks">Feedbacks</Link>
            </li>
            <li className="nav-item">
              {isAuthentciated?  <button
                  className="btn btn-danger btn-sm p-2 text-light "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Logout
                </button> : ""}
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

export default Header;
