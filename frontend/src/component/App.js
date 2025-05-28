import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Component/Register.js';
import Login from './Component/Login.js';
import Home from './Component/Home.js';
import GetStarted from './component/GetStarted.js';
import ProductDetail from './component/ProductDetail.js';
import About from './component/About.js'; 
import Visualization from './component/Visualization.js'; 
import 'font-awesome/css/font-awesome.min.css';
import BiasStatusPage from './component/BiasStatusPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/bias-status/:asin" element={<BiasStatusPage />} /> {}
      </Routes>
    </Router>
  );
}

export default App;

