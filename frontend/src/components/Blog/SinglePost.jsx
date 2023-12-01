import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPost, getPost } from "../../../reducers/BlogReducer";
import { useEffect } from "react";

const SinglePost = () => {
  const dispatch = useDispatch();
  let { postId } = useParams();
  postId = parseInt(postId);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const post = useSelector((state) => selectPost(state, postId));

  if (!post) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="alert alert-warning" role="alert">
              An error occurred while getting the post
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/blog" className="text-decoration-none lead">
        &lt;&lt;Back
      </Link>
      <h1 className=" m-3 text-center">{post.title}</h1>
      <div className="row mt-4 border p-md-2">
        <div className="col-md-8 offset-md-2">
          <div className="text-center">
            <img
              className="img-fluid rounded m-4"
              src={post.image}
              alt={post.title}
            />
          </div>
          <div className="mt-3">
            <p className="">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
