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
  // Dummy blog post data with images

  const post = useSelector((state) => selectPost(state, postId));
  console.log(post);
  if(!post){
    return (
      <div className="container-error py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
    <div className="alert alert-warning" role="alert">
    An error occured while getting post
 </div>
 </div>
 </div>
 </div>
 )
  }

  return (
    <div className="container py-5">
      <Link className="text-decoration-none lead" to="/blog">&lt;&lt;&lt;Back to all posts</Link>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h4 className="display-4 text-center">{post.title}</h4>
          <div className="text-center">
            <img
              className="w-75 rounded"
              src={post.image}
            ></img>
          </div>
          <div className="mt-3">
            <p className="lead">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
