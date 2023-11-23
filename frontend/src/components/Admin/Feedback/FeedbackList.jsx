import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { selectAllFeedbacks } from '../../../../reducers/FeedbackSlice';
import { Link } from 'react-router-dom';
import { isAuth } from '../../../../reducers/authSlice';
const FeedbackList = () => {
  const feedbacks = useSelector(selectAllFeedbacks);
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")
  // Dummy data for illustration
 

  const handleDelete = (id) => {
    // Add logic to handle feedback deletion
    console.log(`Delete feedback with ID: ${id}`);
  };

//  incase of unathorized user
  if(!isAuthenticated || isAdmin != "true"){
    return(
      <div className="container-error px-3">
      <div className="row">
      <div className="alert alert-warning" role="alert">
        You are not Authorized to access this page
      </div>
      </div>
      </div>
    )
  }

  if(!Array.isArray(feedbacks) || feedbacks.length <= 0 ){
    return (
      <div className="container-error px-3 m-4">
      <div className="row">
      <div className="alert alert-info" role="alert">
        An error occured while fetching post, refresh page and try again
      </div>
      </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Feedback List</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.feedId}>
                  <td>{`${feedback.User.firstName} ${feedback.User.lastName}`}</td>
                  <td>{feedback.content}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(feedback.feedId)}
                    >
                      <FiTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
