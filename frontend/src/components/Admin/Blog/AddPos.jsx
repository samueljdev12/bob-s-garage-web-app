import React, { useState } from 'react';
import { FiEdit, FiLink, FiFileText } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { addPost, selectStatus, selectError } from '../../../../reducers/BlogReducer';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../../../reducers/authSlice';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
  });
  
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")
  const dispatch = useDispatch();
  const navaigate = useNavigate();
  const status = useSelector(selectStatus);
  const [requestStaus, setRequestStatus] = useState(status);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestStatus("loading")
    // Add logic to handle post submission
    try {
      dispatch(addPost(formData))
      navaigate("/admin/posts")
    } catch (error) {
      setRequestStatus("error")
    }finally{
      setRequestStatus("idle")
    }
    console.log('Form data:', formData);
  }

  return (
    <div className="container py-5">
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