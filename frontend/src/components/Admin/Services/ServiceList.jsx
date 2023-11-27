import { FiTrash, FiEdit } from 'react-icons/fi';
import {useSelector, useDispatch} from "react-redux";
import { getAllServices, deleteService} from '../../../../reducers/ServiceSlice';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const dispactch = useDispatch();
  const services = useSelector(getAllServices);
  console.log(services)

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Service?');
    if(confirmDelete){
      dispactch(deleteService({id}))
    }
    // Add logic to handle service deletion
    console.log(`Delete service with ID: ${id}`);
  };



  if(!Array.isArray(services) || services.length <= 0 ){
    return (
      <div className="container-error px-3">
        <div className='text-center'>
            <Link to="/admin/add_service" className='btn btn-outline-primary m-3'>Add Service</Link>
        </div>
      <div className="row">
      <div className="alert alert-info" role="alert">
        An error occured while fetching services, refresh page and try again
      </div>
      </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
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
