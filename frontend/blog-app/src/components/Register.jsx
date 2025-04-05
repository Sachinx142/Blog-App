import React, { useState } from 'react'
import axois from 'axios'
import {useNavigate} from 'react-router-dom'
import '../App.css'

const Register = () => {
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axois.post('http://localhost:5000/api/auth/register',{username,email,password});
            navigate('/login');
        } catch (error) {
            alert(error.reponse?.data.message)
        }
    }

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <h2 className='register-title'>Register</h2>
          <form onSubmit={handleSubmit} className='register-form'>
            <input
              type="text"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
              required
              className="register-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-input"
            />
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register
