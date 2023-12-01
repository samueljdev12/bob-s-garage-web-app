// Blog.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  selectPosts,
  selectError,
} from "../../../reducers/BlogReducer";

const Blog = () => {
  const isDarkMode = useSelector((state) => state.theme.mode === 'dark');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const posts = useSelector(selectPosts);
  const error = useSelector(selectError);

  if (posts.length <= 0) {
    return (
      <div className="container container-error px-2">
        <h2 className="mb-4 mt-5">Our Blog</h2>
        <div className="row">
          <div className="alert alert-info" role="alert">
            No posts to show
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 mt-5">Our Blog</h2>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.postId}>
            <div className="card mb-4 h-100">
              <img
                src={post.image}
                className="card-img-top"
                alt={post.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.content.substring(0, 50)}.....
                  <a href={`/blog/post/${post.postId}`}>Read More</a>&gt;&gt;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
