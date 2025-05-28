import React, { useState } from 'react';
import './Styles/Register.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 

function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const history = useHistory(); 

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    const userData = { name, email, password };

    try {
     
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);  

      
      if (response.status === 201) {
        history.push('/login'); 
      }
    } catch (err) {
      console.error("Error during signup:", err.response?.data?.message || err.message);
      
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-content">
          <div className="box">
            <h1>Create New Account!</h1>
            {}
            {error && <p className="error">{error}</p>}

            {}
            <form onSubmit={handleSubmit}>
              <label>Username</label><br/>
              <input 
                type="text" 
                placeholder="Enter your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              /><br/>

              <label>Email</label><br/>
              <input 
                type="email" 
                placeholder="Enter your Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              /><br/>

              <label>Password</label><br/>
              <input 
                type="password" 
                placeholder="Enter your Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              /><br/>

              <button type="submit">Signup</button><br/>
            </form>
            
            <p>Already have an account? <Link to="/login">Signin</Link></p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register;


