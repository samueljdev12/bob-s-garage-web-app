import React, { useEffect, useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { isAuth } from "../../../reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { addFeedabck, getAllFeedbacks, selectIsloading } from '../../../reducers/FeedbackSlice';
import { useNavigate } from 'react-router-dom';
import PopUp from '../layouts/PopUp';
import { showPopup } from '../../utils/ShowPoup';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';
import Error from "../layouts/Error";
import { showContainerError } from "../../utils/showError";
import Loading from '../layouts/Loadin';



const AddFeedback = () => {
  // variables
  const isAuthenticated = useSelector(isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isloading = useSelector(selectIsloading)
  
  console.log(localStorage.getItem("userId"))
  const UserUserId = parseInt(localStorage.getItem("userId"))
  // form data state
  const [formData, setFormData] = useState({
    content: '',
    UserUserId
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
            body: "Feedback added successfully",
            footer: "You will be redirected in 3 seconds.."
          });
        }
    } catch (rejectedValueOrSerializedError){
      const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
      showContainerError(errorMessage)
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
      {/* Popup component */}
      <PopUp/>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Add Feedback</h2>
          {/* Error component */}
          <Error/>
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
            {isloading &&(<Loading message={"Adding feedback"}/>)}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
