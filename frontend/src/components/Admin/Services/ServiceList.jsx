import React, { useState } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';

const ServiceList = () => {
  // Dummy data for illustration
  const dummyServices = [
    { id: 1, name: 'Service 1', description: 'Lorem ipsum dolor sit amet.', price: 50.00 },
    { id: 2, name: 'Service 2', description: 'Consectetur adipiscing elit.', price: 75.00 },
    { id: 3, name: 'Service 3', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 100.00 },
  ];

  const handleDelete = (id) => {
    // Add logic to handle service deletion
    console.log(`Delete service with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Add logic to handle service editing
    console.log(`Edit service with ID: ${id}`);
  };

  return (
    <div className="container py-5">
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
              {dummyServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>${service.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(service.id)}
                    >
                      <FiTrash /> Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(service.id)}
                    >
                      <FiEdit /> Edit
                    </button>
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
