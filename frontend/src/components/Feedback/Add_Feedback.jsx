import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { isAuth, getAuthUser } from "../../../reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { addFeedabck } from '../../../reducers/FeedbackSlice';
import { useNavigate } from 'react-router-dom';
import PopUp from '../layouts/PopUp';
import { showPopup } from '../../utils/ShowPoup';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';



const AddFeedback = () => {

  // variables
  const isAuthenticated = useSelector(isAuth);
  const user = useSelector(getAuthUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form data state
  const [formData, setFormData] = useState({
    content: '',
    UserUserId: user.userId
  });

  // handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

// submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add logic to handle post submission
    try {
      const resultAction = await dispatch(addFeedabck(formData));
      
      // Use unwrapResult to extract the fulfilled value
      const originalPromiseResult = unwrapResult(resultAction);
        if(originalPromiseResult){
          showPopup("success", "/customer-account", navigate, {
            title: "Success",
            body: " Added with success",
            footer: "You will be redirected in 3 seconds.."
          });
        }
    } catch (rejectedValueOrSerializedError){
      const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
      alert(errorMessage);
    }
  };

  //logic end

  // return this if user is not authenticated
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
      <PopUp/>
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
