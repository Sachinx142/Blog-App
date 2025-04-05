import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import '../App.css'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
     const token = localStorage.getItem('token');

     if(!token){
         // If the user is not logged in, redirect them to the login page
         navigate('/login')
     }
     else{
      fetchBlogs(token);
     }

  },[navigate]);


  const fetchBlogs = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs",{
        headers:{Authorization:`Bearer ${token}`}
      });
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog._id !== blogId));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Latest Blogs</h1>
      <div className="blog-container">
  {blogs.map((blog) => (
    <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
  ))}
</div>

    </div>
  );
};

export default Home;
