import React, { useState } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, isAuth, getStatus, getUser } from '../../../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [requestStatus, setRequestStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuth);
  const status = requestStatus

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time email validation checks
    const newErrors = {};
    if (name === 'email' && !validateEmail(value)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      // Form is valid - you can handle login or submission logic here
      setRequestStatus("loading")
      try {
        dispatch(loginAsync(formData)).then(() =>{
          dispatch(getUser());
          navigate("/")
        })
        setRequestStatus("success")
      } catch (error) {
        setRequestStatus("error")
      }finally{
        setRequestStatus("idle")
      }
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

   if(status === "failed"){
    return (<div className="container-error px-3">
    <div className="row">
    <div className="alert alert-danger" role="alert">
       An error occured try again! use correct login details
    </div>
    </div>
    </div>)
   }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FiMail />
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FiLock />
                Password
              </label>
              <input
                type="password"
                className={`form-control`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login <FiLogIn />
            </button>
            <p className="mt-3">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
