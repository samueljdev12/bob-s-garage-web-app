import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { isAuth } from "../../../reducers/authSlice";
import { useSelector } from "react-redux";
const AddFeedback = () => {
  const isAuthenticated = useSelector(isAuth);
  const [formData, setFormData] = useState({
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle feedback submission
    console.log('Form data:', formData);
  };

  if(!isAuthenticated){
    return(
      <div className="container-error px-3">
      <div className="row">
      <div className="alert alert-warning" role="alert">
        You are not Authorized to access this page, Please login
      </div>
      </div>
      </div>
    )
  }
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Add Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                <FiMessageSquare /> Feedback Content
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="4"
                value={formData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
