import './style/Login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage(response.data.message); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred'); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-content">
          <div className="box">
            <h1>Welcome Back!</h1>
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
              <label>Email</label><br />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
              /><br />

              <label>Password</label><br />
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
              /><br />

              <button type="submit" name="signin">Signin</button><br />
            </form>

            <p>Don't have an account? <Link to="/register">Signup</Link></p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;

