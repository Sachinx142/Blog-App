import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/blogs", formData);
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea name="content" className="form-control" rows="5" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" name="image" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success w-100 my-2">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
