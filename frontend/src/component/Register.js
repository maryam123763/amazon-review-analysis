import React, { useState } from 'react';
import './style/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

   
      setMessage(response.data.message || 'Signup successful! Redirecting to login...');
      
      
      setTimeout(() => {
        navigate('/Login'); 
      }, 2000);
    } catch (error) {
     
      setMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-content">
          <div className="box">
            <h1>Create New Account!</h1>

            {}
            {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}

            <form onSubmit={handleSubmit}>
              {}
              <label htmlFor="name">Username</label><br />
              <div className="input-icon-container">
                <i className="fa fa-user"></i> {}
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Username"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />

              {}
              <label htmlFor="email">Email</label><br />
              <div className="input-icon-container">
                <i className="fa fa-envelope"></i> {}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />

              {}
              <label htmlFor="password">Password</label><br />
              <div className="input-icon-container">
                <i className="fa fa-key"></i> {}
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />

              <button type="submit" name="signup" disabled={loading}>
                {loading ? 'Signing up...' : 'Signup'}
              </button><br />
            </form>

            <p>Already have an account? <Link to="/Login">Signin</Link></p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register;





