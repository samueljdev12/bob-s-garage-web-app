import { FiTrash, FiEdit } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { getAllServices, deleteService} from '../../../../reducers/ServiceSlice';
import { Link, useNavigate } from 'react-router-dom';
import { showPopup } from '../../../utils/ShowPoup';
import PopUp from '../../layouts/PopUp';
// unwrap for dispatch
import { unwrapResult } from '@reduxjs/toolkit';

import { isAuth } from '../../../../reducers/authSlice';

const ServiceList = () => {

  // variables
  const dispactch = useDispatch();
  const services = useSelector(getAllServices);
  const isAuthenticated = useSelector(isAuth);
  const isAdmin = localStorage.getItem("isAdmin")


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Service?');
    if(confirmDelete){
      try {
      const resultAction = await dispactch(deleteService({id}));
      
      // Use unwrapResult to extract the fulfilled value
      const originalPromiseResult = unwrapResult(resultAction);
      if(originalPromiseResult){
         alert("Service was deleted succesfully");
        }

      } catch (rejectedValueOrSerializedError) {
        const errorMessage = rejectedValueOrSerializedError.message || 'An error occurred';
        alert(errorMessage);
      }
      
    }
  };

  // check for unathorized user
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


  if(!Array.isArray(services) || services.length <= 0 ){
    return (
      <div className="container-error px-3">
        <div className='text-center'>
            <Link to="/admin/add_service" className='btn btn-outline-primary m-3'>Add Service</Link>
        </div>
      <div className="row">
      <div className="alert alert-info" role="alert">
         No service 
      </div>
      </div>
      </div>
    )
  }



  return (
    <div className="container py-5">
      <PopUp/>
        <div className='text-center'>
            <Link to="/admin/add_service" className='btn btn-outline-primary m-3'>Add Service</Link>
        </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Service List</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.serviceId}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>${service.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(service.serviceId)}
                    >
                      <FiTrash /> Delete
                    </button>
                    <Link to={`/admin/services/service/edit/${service.serviceId}`}
                      className="btn btn-warning btn-sm"
                      
                    >
                      <FiEdit /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
