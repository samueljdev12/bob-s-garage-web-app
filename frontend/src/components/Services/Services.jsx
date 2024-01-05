import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getAllServices } from "../../../reducers/ServiceSlice";
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import Loading from "../layouts/Loadin";

const Services = () => {

   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const services = useSelector(getAllServices)

  

  return (
    <div className="container p-4">
       {services.length <= 0 &&(
        <Loading message={"Getting Services"}/>
      )}
      <h2 className="mt-4 text-center">Our Services</h2>
      <div className="container text-md-center description-div bg-light p-3 my-4  rounded">
          <p className="text-dark">
          We are located at <span><FiMapPin></FiMapPin></span>123 Main Street, Melbourne, Australia. Feel free to drop by for an inspection or consultation.
          </p>
          <p className="text-dark">
            For inquiries, you can reach us at <span><FiPhone></FiPhone></span>(04) 123-4567 or email us at <span><FiMail></FiMail></span> info@bobsgarage.com.
          </p>
        </div>
        <p className='text-md-center lead'>Our services and prices are listed below</p>
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
