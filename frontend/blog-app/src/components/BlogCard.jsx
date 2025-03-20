import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import '../App.css'; 

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          onDelete(blog._id);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="blog-card my-2">
      {blog.image && (
        <OptimizedImage
          src={blog.image}
          alt={blog.title}
          className="blog-image"
        />
      )}
      <div className="blog-content">
        <h5 className="blog-title">{blog.title}</h5>
        <p className="blog-text">{blog.content.substring(0, 100)}...</p>
        <div className="blog-actions">
          <button onClick={() => navigate(`/blog/${blog._id}`)} className="btn btn-primary">
            Read More
          </button>
          <button onClick={() => navigate(`/edit/${blog._id}`)} className="btn btn-warning">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
