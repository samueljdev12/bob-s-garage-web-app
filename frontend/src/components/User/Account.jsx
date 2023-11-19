import { useDispatch, useSelector } from "react-redux";
import { getUser, getAuthUser, isAuth } from "../../../reducers/authSlice";
import { useEffect } from "react";
const Account = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
     dispatch(getUser())
  }, [dispatch])
  
 const isAuthenticated = useSelector(isAuth);
  const userData = useSelector(getAuthUser);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
