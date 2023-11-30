import { useState } from 'react';
import { FiEdit, FiLink, FiFileText } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { addPost } from '../../../../reducers/BlogReducer';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../../../reducers/authSlice';
import PopUp from '../../layouts/PopUp';
import { showPopup } from '../../../utils/ShowPoup';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';

const AddPost = () => {

  // form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
  });
  
  // variables
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
// change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle not logged in user
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

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add logic to handle post submission
    try {
      const resultAction = await dispatch(addPost(formData));
      
      // Use unwrapResult to extract the fulfilled value
      const originalPromiseResult = unwrapResult(resultAction);
      if(originalPromiseResult){
        showPopup("success", "/admin/posts", navigate, {
          title: "Success",
          body: " Added with success",
          footer: "You will be redirected in 3 seconds.."
        });
      }
     
    } catch (rejectedValueOrSerializedError) {
      const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
      alert(errorMessage);
    }
  }

  return (
    <div className="container py-5">
      <PopUp/>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Add Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                <FiEdit /> Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                <FiFileText /> Content
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
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">
                <FiLink /> Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
