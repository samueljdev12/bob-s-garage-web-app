import { useDispatch, useSelector } from "react-redux";
import { getUser, getAuthUser, isAuth } from "../../../reducers/authSlice";
import { selectUserFeedback } from "../../../reducers/FeedbackSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Account = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
     dispatch(getUser())
  }, [dispatch])
  
 const isAuthenticated = useSelector(isAuth);
  const userData = useSelector(getAuthUser);
  const userFeed = useSelector((state) => selectUserFeedback(state, userData.userId))
  console.log(userFeed)

  if(!isAuthenticated){
    return(
      <div className="container-error px-3">
      <div className="row">
      <div className="alert alert-warning" role="alert">
        You are not Authorized to access this page, Please login
      </div>
      </div>
      </div>
    )
  }


  return (
    <div className="container my-5 border p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Your Account Details</h2>
          <div className="user-info">
            <div className="info-item">
              <span className="info-label">First Name:</span>
              <span className="info-value">{userData.firstName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Name:</span>
              <span className="info-value">{userData.lastName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="text-center">
                <Link to="/user/edit" className="btn btn-outline-primary ">Edit</Link>
            </div>
          </div>
           {userFeed !== undefined  &&(<div className="text-center m-3">
              <h4>Your feedback</h4>
              <p>{userFeed.content}</p>
              <Link to={`/testimonials/edit/${userFeed.feedId}`} className="btn btn-outline-secondary ">Edit Feedback</Link>
          </div>)}
          {userFeed === undefined &&(
            <div className="text-center m-3">
            <h4>You have no Feedback</h4>
             <Link className="btn btn-outline-primary " to="/testimonials/new">Leave Feedback</Link>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
