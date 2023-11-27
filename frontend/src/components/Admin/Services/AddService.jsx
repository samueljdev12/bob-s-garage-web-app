import { useEffect, useState } from "react";
import { FiEdit, FiAlignLeft, FiDollarSign } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getAllServices, addServices } from "../../../../reducers/ServiceSlice";
import { Link, useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState("idle");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle service submission
    console.log("Form data:", formData);
    try {
      dispatch(addServices(formData));
      setRequestStatus("success");
      showPopup()
    } catch (error) {
      setRequestStatus("failed");
    }
  };

  // show popup
  function showPopup() {
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal1"));
    myModal.show();
  }

  return (
    // modal
    <div className="container py-5">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
        style={{ display: "none" }}
      >
        Open Popup
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Popup Title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Service added with success.</div>
            <div className="modal-footer">
              <button
                
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
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
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
