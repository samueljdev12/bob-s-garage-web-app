import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { isAuth, getAuthUser } from "../../../reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { addFeedabck } from '../../../reducers/FeedbackSlice';
import { useNavigate } from 'react-router-dom';
const AddFeedback = () => {
  const isAuthenticated = useSelector(isAuth);
  const user = useSelector(getAuthUser)
  const dispatch = useDispatch();
  const navaigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
    UserUserId: user.userId
  });

  const [requestStatus, setRequestStatus] = useState("idle");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(`The userid is ${formData.UserUserId} and type is ${typeof(formData.UserUserId)}`)
  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestStatus("loading")
    // Add logic to handle post submission
    try {
      dispatch(addFeedabck(formData))
    } catch (error) {
      setRequestStatus("error")
    }finally{
      setRequestStatus("idle")
    }
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
