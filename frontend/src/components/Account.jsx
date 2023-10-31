import { getUser, getAuthUser } from '../../reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const Account = () => {

   const dispatch = useDispatch();
   const userD = useSelector(getAuthUser)
   console.log(userD)
   console.log(userD.firstName)
   
   
  
   useEffect(() =>{
    dispatch(getUser())

   },[])
  // Mock user data
  const userData = {
    firstName: userD.firstName,
    lastName: userD.lastName,
    email: userD.email,
  };

  // State to manage user data for editing
  const [user, setUser] = useState({ ...userData });

  // Function to handle user data updates
  const handleUpdate = () => {
    // Implement your update logic here
    console.log('Updated user data:', user);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Customer Account</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
