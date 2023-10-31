import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'Engine Diagnostics and Repair',
      description: 'Our experienced mechanics offer expert engine diagnostics and repair services to keep your vehicle running smoothly.',
      price: '$99.99',
    },
    {
      title: 'Brake System Maintenance',
      description: 'Trust us for your brake system maintenance needs, ensuring the safety of your vehicle.',
      price: '$79.99',
    },
    {
      title: 'Transmission Services',
      description: 'We provide quality transmission repair and maintenance to keep your vehicle in optimal condition.',
      price: '$129.99',
    },
    {
      title: 'Oil Changes and Routine Maintenance',
      description: 'Regular oil changes and routine maintenance are essential for the longevity of your vehicle.',
      price: '$49.99',
    },
    {
      title: 'Electrical System Repair',
      description: 'Our skilled technicians handle electrical system repairs to keep your vehicle\'s electronics functioning correctly.',
      price: '$89.99',
    },
  ];

  return (
    <div className="container p-4">
      <h2 className="mt-4 text-center">Our Services</h2>
      <p className='text-center'>Our services and prices are listed below</p>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <p className="card-text"><strong>Price: {service.price}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
