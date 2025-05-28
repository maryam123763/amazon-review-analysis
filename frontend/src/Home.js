import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import './Styles/Home.css'; 

function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleGetStartedClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); 
  };

  return (
    <div className="home-container">
      {showConfetti && <Confetti width={width} height={height} />} {}

      <header className="header">
        <div className="logo">
          <h1>Bias Detector</h1>
        </div>
        <nav className="nav-bar">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/register" className='authentication'>Signup</Link></li>
            <li><Link to="/login" className='authentication'>Signin</Link></li>
          </ul>
        </nav>
      </header>

      <div className="image">
        <div className="image-overlay">
          <h2>Are Online Reviews Trustworthy?</h2>
          <p>Take the first step to unbiased decision-making. Our AI detects bias & fake reviews</p>
        </div>
      </div>

      {}
      <footer className="get-started-footer">
        <Link 
          to="/get-started" 
          className="get-started-button"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Link>
      </footer>
    </div>
  );
}

export default Home;
