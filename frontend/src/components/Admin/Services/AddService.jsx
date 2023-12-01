import { useState } from "react";
import { FiEdit, FiAlignLeft, FiDollarSign } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {addServices } from "../../../../reducers/ServiceSlice";
import { useNavigate } from "react-router-dom";
import PopUp from "../../layouts/PopUp";
import { showPopup } from "../../../utils/ShowPoup";
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';
import { isAuth } from '../../../../reducers/authSlice';
import Error from "../../layouts/Error";
import { showContainerError } from "../../../utils/showError";

const AddService = () => {

  // variables 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")
  
  // form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });


// form  change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(addServices(formData));
      
      // Use unwrapResult to extract the fulfilled value
      const originalPromiseResult = unwrapResult(resultAction);
      if(originalPromiseResult){
        showPopup("success", "/admin/services", navigate, {
          title: "Success",
          body: " Added with success",
          footer: "You will be redirected in 3 seconds.."
        });
      }
      
    } catch (rejectedValueOrSerializedError) {
      const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
      showContainerError(errorMessage);
    }
  };

    //  incase of unathorized user
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

  return (
    // modal
    <div className="container py-5">
       <PopUp/>
      {/* main conten */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Add Service</h2>
          <Error/>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <FiEdit /> Service Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <FiAlignLeft /> Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                <FiDollarSign /> Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
