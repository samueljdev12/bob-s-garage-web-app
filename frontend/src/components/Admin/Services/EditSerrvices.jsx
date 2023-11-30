import { useState } from "react";
import { FiEdit, FiAlignLeft, FiDollarSign } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { editService, selectService} from "../../../../reducers/ServiceSlice";
import {useNavigate, useParams } from "react-router-dom";
import PopUp from "../../layouts/PopUp";
import {showPopup} from "../../../utils/ShowPoup";
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';


const EditService = () => {
  //variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let {id} = useParams();
  id = parseInt(id);

  const service = useSelector((state) => selectService(state, id))

// form data state
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    price: service?.price || 0,
    serviceId: service?.serviceId || 0
  });

  // form chnage handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const resultAction = await dispatch(editService(formData));
      
      // Use unwrapResult to extract the fulfilled value
      const originalPromiseResult = unwrapResult(resultAction);
      if(originalPromiseResult){
       console.log("After submit")
      
        // calling showpopu
        showPopup("success", "/admin/services", navigate, {
          title: "Success",
          body: " Added with success",
          footer: "You will be redirected in 3 seconds.."
        });
      }
    } catch (rejectedValueOrSerializedError) {
      const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
      alert(errorMessage);
    }
  };

  // show popup
 

  return (
    <div>
      <PopUp/>
      {/* main conten */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Add Service</h2>
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
              Update Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;
