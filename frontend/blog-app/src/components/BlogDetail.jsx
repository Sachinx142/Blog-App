import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import '../App.css'; 

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Blog post not found
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        {blog.image && (
          <OptimizedImage
            src={blog.image}
            alt={blog.title}
            className="card-img-top"
            maxHeight="50%"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h1 className="card-title mb-4">{blog.title}</h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <small className="text-muted">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </small>
            <div className="btn-group d-flex gap-2">
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/edit/${blog._id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this blog post?')) {
                    fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
                      method: 'DELETE',
                    }).then(() => navigate('/'));
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="card-text">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 