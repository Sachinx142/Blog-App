import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./components/EditBlog";
import BlogDetail from "./components/BlogDetail";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
};

export default App;
