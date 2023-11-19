import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getAllServices } from "../../../reducers/ServiceSlice";
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Services = () => {

   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const services = useSelector(getAllServices)

  if(services.length <= 0 ){
    return (
      <div className="container-error px-3">
      <h2 className="mt-4">Testimonials</h2>
      <div className="row">
      <div className="alert alert-info" role="alert">
        No posts to show
      </div>
      </div>
      </div>
    )
  }

  return (
    <div className="container p-4">
      <h2 className="mt-4 text-center">Our Services</h2>
      <p className='text-center'>Our services and prices are listed below</p>
      <div className="container text-md-center">
          <p>
            We are located at <span><FiMapPin></FiMapPin></span>123 Main Street, Anytown, USA. Feel free to drop by for an inspection or consultation.
          </p>
          <p>
            For inquiries, you can reach us at <span><FiPhone></FiPhone></span>(555) 123-4567 or email us at <span><FiMail></FiMail></span> info@bobsgarage.com.
          </p>
        </div>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4" key={service.serviceId}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="card-text"><strong>Price: ${service.price}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
