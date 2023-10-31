import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { getPost, selectPosts } from "../../reducers/BlogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getPost())
  }, [dispatch])
  // Dummy blog post data with images

  const posts = useSelector(selectPosts);
  console.log(`the posts in blog.jsx are ${posts}`);
  const dummyBlogPosts = [
    {
      id: 1,
      title: 'First Blog Post',
      summary: 'This is the summary of the first blog post.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2783&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add the URL of the image
    },
    {
      id: 2,
      title: 'Second Blog Post',
      summary: 'This is the summary of the second blog post.',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2783&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add the URL of the image
    },
    {
      id: 3,
      title: 'Third Blog Post',
      summary: 'This is the summary of the third blog post.',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse...',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2783&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Add the URL of the image
    },
  ];

  return (
    <div className="container">
      <h2 className="mt-4">Blog</h2>
      <div className="row">
        {dummyBlogPosts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card mb-4">
              <img src={post.image} className="card-img-top" alt={post.title} /> {/* Image added here */}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.summary}</p>
                <a href={`/blog/${post.id}`} className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
