import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { selectAllFeedbacks, deleteFeed } from '../../../../reducers/FeedbackSlice';
import { isAuth } from '../../../../reducers/authSlice';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';

const FeedbackList = () => {

  // varibales
  const feedbacks = useSelector(selectAllFeedbacks);
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")
  const dispatch = useDispatch();
 
  // handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Feedback?');
    // Add logic to handle feedback deletion
     if(confirmDelete){
      try {
      const resultAction = await dispatch(deleteFeed({id}));
      
      // Use unwrapResult to extract the fulfilled value
      const originalPromiseResult = unwrapResult(resultAction);
      
        if(originalPromiseResult){
          alert("Feedback was delete successfully")
        }
      
      } catch (error) {
        // Handle the error here
       
       alert(error.message);
      }
      
     }
    
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
         No Feedbacks
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
