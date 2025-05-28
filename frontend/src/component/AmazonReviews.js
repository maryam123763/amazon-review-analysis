import React from 'react';
import { useNavigate } from 'react-router-dom';

const AmazonReviews = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button 
        onClick={() => navigate('/products')}
        className="bg-blue-500 text-white px-6 py-3 text-xl rounded-lg hover:bg-blue-700"
      >
        Amazon Reviews
      </button>
    </div>
  );
};

export default AmazonReviews;
