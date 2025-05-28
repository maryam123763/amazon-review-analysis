import React from 'react';
import { Link } from 'react-router-dom'; 
import './GetStarted.css'; 
import biasImage from './Styles/bias123.jpeg'; 

const GetStarted = () => {
    console.log('GetStarted component rendered');
    
    return (
        <div className="get-started-content"> {}
            <div className="text-section">
                <h1 className="title">Bias Detector</h1>
                <p className="description">
                    Take the first step to unbiased decision-making. Our AI detects bias & fake reviews.
                </p>
                <Link to="/Home">
                    <button className="get-started-button">Get Started</button> {}
                </Link>
            </div>
            <div className="image-section">
                <img
                    src={biasImage} 
                    alt="AI Illustration"
                    className="right-image"
                />
            </div>
        </div>
    );
};

export default GetStarted;

