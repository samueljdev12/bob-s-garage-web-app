import React from 'react';

const Feedback = () => {
  // Dummy testimonial/feedback data
  const dummyTestimonials = [
    {
      id: 1,
      name: 'John Doe',
      feedback:
        'I had a great experience with Bob’s Garage. The staff was friendly and the service was top-notch.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      feedback:
        'The mechanics at Bob’s Garage are knowledgeable and professional. I highly recommend their services.',
    },
    {
      id: 3,
      name: 'David Johnson',
      feedback: 'Quick and efficient service. I m a satisfied customer!',
    },
  ];

  return (
    <div className="container p-md-5">
      <h2 className="mt-4">Testimonials</h2>
      <div className="row">
        {dummyTestimonials.map((testimonial) => (
          <div className="col-md-12" key={testimonial.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{testimonial.name}</h5>
                <p className="card-text">{testimonial.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
