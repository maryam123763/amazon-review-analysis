import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './component/Register.js';
import Login from './component/Login.js';
import Home from './component/Home.js';
import About from './component/About.jsx';
import AmazonReviews from './component/AmazonReviews.js';  
import ProductsList from './component/ProductsList.js';     
import Visualization from './component/Visualization.js';
import ProductDetail from './component/ProductDetail.js';   
import BiasStatusPage from './component/BiasStatusPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/amazon-reviews" element={<AmazonReviews />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/product/:asin" element={<ProductDetail />} />
        <Route path="/bias-status" element={<BiasStatusPage />} />


      </Routes>
    </Router>
  );
}

export default App;










   

