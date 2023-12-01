import { Link, useNavigate } from 'react-router-dom';
import { FiCompass, FiInfo, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';



const Home = () => {
  return (

    <div className='text-center'> 
      <section className="hero text-center py-5">
        <div className="container bg-primary bg-opacity-75 bg-gradient text-white  border rounded p-5">
          <h1>Welcome to Bobs Garage</h1>
          <p className="lead">
            Your trusted automotive service provider for over a decade.
          </p>
          <Link to="/services" className="btn btn-primary btn-lg">
          Explore Our Services<FiCompass className='mx-1'></FiCompass>
          </Link>
        </div>
      </section>

      <section className="about-us bg-primary bg-gradient py-5 text-light rounded ">
        <div className="container">
          <h2 className="text-center">About Us</h2>
          <p>
            At Bobs Garage, we are dedicated to providing top-notch vehicle repair and maintenance services. Our
            experienced and certified mechanics are passionate about cars and committed to ensuring your vehicle runs
            smoothly.
          </p>
          <Link to="/about_us" className="btn btn-outline-light border-5 rounded ">
            Learn More<FiInfo className='mx-1'></FiInfo>
          </Link>
        </div>
      </section>

      <section className="services py-5">
        <div className="container">
          <h2 className="text-center">Our Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body bg-dark bg-gradient  text-white p-md-5">
                  <h5 className="card-title">Engine Repair</h5>
                  <p className="card-text">
                    We offer expert engine diagnostics and repair services.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body bg-dark bg-gradient   text-white p-md-5">
                  <h5 className="card-title">Brake Maintenance</h5>
                  <p className="card-text">Trust us for your brake system maintenance needs.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body bg-dark bg-gradient text-white p-md-5">
                  <h5 className="card-title">Transmission Services</h5>
                  <p className="card-text">Quality transmission repair and maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact py-5">
        <div className="container">
          <h2 className="text-center">Contact Us</h2>
          <p>
            We are located at <span><FiMapPin></FiMapPin></span>123 Main Street, Anytown, Australia. Feel free to drop by for an inspection or consultation.
          </p>
          <p>
            For inquiries, you can reach us at <span><FiPhone></FiPhone></span>(555) 123-4567 or email us at <span><FiMail></FiMail></span> info@bobsgarage.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
