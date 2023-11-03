import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  selectPosts,
  selectError,
} from "../../../reducers/BlogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);
  // Dummy blog post data with images

  const posts = useSelector(selectPosts);
  const error = useSelector(selectError);
  console.log(error)

  return (
    <div className="container py-5">
      <h2 className="mb-4 mt-5">Blog</h2>
      <div className="row">
        {error && (
          <div class="alert alert-danger" role="alert">
            An error occured while getting post, Please try again
          </div>
        )}
        {posts.map((post) => (
          <div className="col-md-4" key={post.postId}>
            <div className="card mb-4">
              <img src={post.image} className="card-img-top" alt={post.title} />{" "}
              {/* Image added here */}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.content.substring(0, 50)}.....&lt;&lt;
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
