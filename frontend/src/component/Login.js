import './style/Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        setIsLoggedIn(true);
      } else {
        setError(data.message || 'Invalid email or password. Try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-content">
          <div className="box">
            <h1>Welcome Back!</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!isLoggedIn ? (
              <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /><br />

                <label>Password</label><br />
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                /><br />

                <button type="submit" name="signin">Sign In</button><br />
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
              </form>
            ) : (
              <div className="action-buttons">
                <button className="action-button orange" onClick={() => navigate('/amazon-reviews')}>
                  🛒 Explore Amazon Reviews
                </button>

                <button className="action-button blue" onClick={() => navigate('/visualization')}>
                  📊 Go to Visualization
                </button>

                <a
                  className="action-button green"
                  href="http://localhost:5000/api/download/products"
                  download
                >
                  📥 Download Dataset
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;




