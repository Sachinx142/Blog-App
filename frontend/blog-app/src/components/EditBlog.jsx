import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    image: ''
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={blog.content}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            id="image"
            name="image"
            value={blog.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Blog</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBlog; 