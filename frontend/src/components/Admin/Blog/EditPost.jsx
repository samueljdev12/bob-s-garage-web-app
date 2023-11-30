import { useState } from 'react';
import { FiEdit, FiLink, FiFileText } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { editPost, selectPost } from '../../../../reducers/BlogReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuth } from '../../../../reducers/authSlice';
import PopUp from '../../layouts/PopUp';
import { showPopup } from '../../../utils/ShowPoup';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';

const EditPost = () => {
  // variables
  const {id} = useParams();
  const postId = parseInt(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPost(state, postId))
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")


  // states
  const [formData, setFormData] = useState({
    postId: postId,
    title: post?.title || '',
    content: post?.content || '',
    image: post?.image || '',
  });

  // onchange handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle post submission
    try {

      const resultAction = await dispatch(editPost(formData));
      const originalPromiseResult = unwrapResult(resultAction);
    // Use unwrapResult to extract the fulfilled value
       if(originalPromiseResult){
        // calling showpopu
      showPopup("success", "/admin/posts", navigate, {
        title: "Success",
        body: " Update with success",
        footer: "You will be redirected in 3 seconds.."
      });
       }
    } catch (rejectedValueOrSerializedError) {
      const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
      alert(errorMessage);
    }
  }

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
              update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
