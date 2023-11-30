import { FiTrash, FiEdit } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import { selectPosts } from '../../../../reducers/BlogReducer';
import { Link } from 'react-router-dom';
import { deletePost } from '../../../../reducers/BlogReducer';
import { isAuth } from '../../../../reducers/authSlice';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';

const PostList = () => {
  
  // variables
  const disptach = useDispatch();
  const posts = useSelector(selectPosts) || []
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")
 
  // delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    // Add logic to handle post deletion
    if(confirmDelete){
      try {
        const resultAction = await disptach(deletePost(id));
        
        // Use unwrapResult to extract the fulfilled value
        const originalPromiseResult = unwrapResult(resultAction);
        
          if(originalPromiseResult){
            alert("Post was delete successfully")
          }
        
        } catch (error) {
          // Handle the error here
         
         alert(error.message);
        }

    }
  };
  
  // unathorized users 
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

  if(!Array.isArray(posts) || posts.length <= 0 ){
    return (
      <div className="container-error px-3">
        <div className='text-center'>
            <Link to="/admin/add_post" className='btn btn-outline-primary m-3'>Add Post</Link>
        </div>
      <div className="row">
      <div className="alert alert-info" role="alert">
        No post to show
      </div>
      </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className='text-center'>
            <Link to="/admin/add_post" className='btn btn-outline-primary m-3'>Add Post</Link>
        </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Post List</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(posts) && (posts.map((post) => (
                <tr key={post.postId}>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(post.postId)}
                    >
                      <FiTrash /> Delete
                    </button>
                    <Link
                      className="btn btn-warning btn-sm"
                      to={`/admin/post/edit/${post.postId}`}
                    >
                      <FiEdit /> Edit
                    </Link>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostList;
