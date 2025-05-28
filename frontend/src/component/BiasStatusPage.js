import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BiasStatusPage = () => {
  const location = useLocation();
  const { asin } = location.state || {}; // 👈 receive the ASIN from state

  const [biasStatusList, setBiasStatusList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBiasStatus = async () => {
      try {
        if (!asin) {
          setError('Invalid ASIN.');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/reviews/bias/${asin}`);
        setBiasStatusList(response.data); // assuming it returns an array of objects like [{ reviewId, biasStatus }]
      } catch (error) {
        console.error(error);
        setError('Failed to fetch bias status.');
      }
    };

    fetchBiasStatus();
  }, [asin]);

  if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;
  if (!biasStatusList.length) return <h3>Loading Bias Status...</h3>;

  return (
    <div className="bias-status-page">
      <h1>Bias Status for ASIN: {asin}</h1>
      {biasStatusList.map((item) => (
        <div key={item.reviewId} style={{ marginBottom: '1rem' }}>
          <strong>Review ID:</strong> {item.reviewId}<br />
          <strong>Status:</strong> {item.biasStatus}
        </div>
      ))}
    </div>
  );
};

export default BiasStatusPage;




