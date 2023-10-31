import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

const Register = () => {
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // Basic validation for first name and last name (letters only)
    const namePattern = /^[A-Za-z]+$/;
    if (!formData.firstName.match(namePattern)) {
      newErrors.firstName = 'First name must contain letters only';
    }
    if (!formData.lastName.match(namePattern)) {
      newErrors.lastName = 'Last name must contain letters only';
    }
  
    if (formData.email === '') {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
  
    if (formData.password === '') {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must include at least one uppercase letter';
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = 'Password must include at least one special character (!@#$%^&*)';
    }
  
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }
  
    if (Object.keys(newErrors).length === 0) {
      // Form is valid - you can handle registration or submission logic here
      console.log('Form data:', formData);
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                <FiUser></FiUser>First Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                <FiUser></FiUser>Last Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FiMail></FiMail>Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FiLock></FiLock>Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">
                <FiLock></FiLock>Repeat Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
              />
              {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword}</div>}
            </div>
            <button type="submit" className="btn btn-primary mx-auto ">
              Register<FiUserPlus></FiUserPlus>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
