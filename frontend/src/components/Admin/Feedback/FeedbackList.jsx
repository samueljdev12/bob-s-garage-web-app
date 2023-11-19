import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';

const FeedbackList = () => {
  // Dummy data for illustration
  const dummyFeedbacks = [
    { id: 1, user: 'John Doe', content: 'Great service!' },
    { id: 2, user: 'Jane Smith', content: 'Very satisfied with the work.' },
    { id: 3, user: 'Bob Johnson', content: 'Excellent experience.' },
  ];

  const handleDelete = (id) => {
    // Add logic to handle feedback deletion
    console.log(`Delete feedback with ID: ${id}`);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Feedback List</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyFeedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.user}</td>
                  <td>{feedback.content}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(feedback.id)}
                    >
                      <FiTrash /> Delete
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

export default FeedbackList;
