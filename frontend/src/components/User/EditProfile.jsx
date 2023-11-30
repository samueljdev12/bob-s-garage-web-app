import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { getAuthUser, isAuth, edit} from '../../../reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showPopup } from '../../utils/ShowPoup';
import PopUp from '../layouts/PopUp';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

  const isAuthenticated = useSelector(isAuth);
  const user = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      firstName: '' ,
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      // Add logic to update user profile with API call
      dispatch(edit(values))
        .then(() => {
          // Show success popup
          showPopup("success", "/customer-account", navigate, {
            title: "Success",
            body: " Update with success",
            footer: "You will be redirected in 3 seconds..",
          });
        })
        .catch((error) => {
          // Handle errors, e.g., show an alert
          alert("An error occurred");
        });

    },
  });

  // pust user data
  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);



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
    <div>
      <PopUp/>
      <h2>Edit Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            <FaUser /> First Name
          </label>
          <input
            type="text"
            className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            <FaUser /> Last Name
          </label>
          <input
            type="text"
            className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <FaEnvelope /> Email
          </label>
          <input
            type="text"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
