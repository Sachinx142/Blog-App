import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let reponse = await axios.post('http://localhost:5000/api/auth/login',{email,password});
            localStorage.setItem('token',reponse.data.token);
            navigate('/')
        } catch (error) {
            alert(error.response.data.message);
        }
    }

  return (
    <>
      <div className="login-container">
        <div className="login-card">
            <h2 className='login-title'>Login</h2>
          <form onSubmit={handleSubmit} className='login-form'>
            <input
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className='login-input'
            />
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className='login-input'
            />
            <button type="submit" className='login-button'>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login
