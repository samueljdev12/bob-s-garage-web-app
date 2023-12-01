import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { register} from '../../../reducers/authSlice';
import { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import {Link} from 'react-router-dom'
import Error from "../layouts/Error";
import { showContainerError } from "../../utils/showError";


const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate the input while the user types
    const newErrors = { ...errors };

    if (name === 'firstName' || name === 'lastName') {
      const namePattern = /^[A-Za-z]+$/;
      if (!value.match(namePattern)) {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} must contain letters only`;
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'email') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        newErrors.email = 'Invalid email format';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/(?=.*[A-Z])/.test(value)) {
        newErrors.password = 'Password must include at least one uppercase letter';
      } else if (!/[!@#$%^&*]/.test(value)) {
        newErrors.password = 'Password must include at least one special character (!@#$%^&*)';
      } else {
        delete newErrors.password;
      }
    }

    if (name === 'repeatPassword') {
      if (value !== formData.password) {
        newErrors.repeatPassword = 'Passwords do not match';
      } else {
        delete newErrors.repeatPassword;
      }
    }

    setErrors(newErrors);

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Additional validation and form submission logic
    // ...

    if (Object.keys(errors).length === 0) {
      // Form is valid - you can handle registration or submission logic here
      try {
        // Dispatch the register action
        const resultAction = await dispatch(register(data));
      
        // Use unwrapResult to extract the fulfilled value
        const originalPromiseResult = unwrapResult(resultAction);
          if(originalPromiseResult){
            // Alert for successful registration
               alert('SignUp successful');
          }
        
      } catch (rejectedValueOrSerializedError) {
      
        // Handle the error here
        let errorMessage = 'An error occurred';
      
        // Check if the error object has a message property
        if (rejectedValueOrSerializedError && rejectedValueOrSerializedError.message) {
          errorMessage = rejectedValueOrSerializedError.message;
        }
      
        // Show the error message in an alert
        showContainerError(errorMessage);
      }
      
    }
  };



  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <p>
           Already have an account <Link to="/login">Login</Link>
            </p>
          <h2 className="mt-4">Register</h2>
          <Error/>
          <form onSubmit={handleSubmit} className='border rounded-2 p-3 mb-4 rounded'>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                <FiUser></FiUser> First Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                <FiUser></FiUser> Last Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FiMail></FiMail> Email
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
                <FiLock></FiLock> Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">
                <FiLock></FiLock> Repeat Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                required
              />
              {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword}</div>}
            </div>
            <div className='text-center'>
            <button type="submit" className="btn btn-primary mx-auto">
              Register<FiUserPlus></FiUserPlus>
            </button>
            </div>
            <p className="mt-3">
              Already have an account <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
