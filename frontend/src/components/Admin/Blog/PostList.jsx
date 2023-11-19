import React, { useState } from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';

const PostList = () => {
  // Dummy data for illustration
  const dummyPosts = [
    { id: 1, title: 'Post 1', content: 'Lorem ipsum dolor sit amet.' },
    { id: 2, title: 'Post 2', content: 'Consectetur adipiscing elit.' },
    { id: 3, title: 'Post 3', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ];

  const handleDelete = (id) => {
    // Add logic to handle post deletion
    console.log(`Delete post with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Add logic to handle post editing
    console.log(`Edit post with ID: ${id}`);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Post List</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FiTrash /> Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(post.id)}
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

export default PostList;
