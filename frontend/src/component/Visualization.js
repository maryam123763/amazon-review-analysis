import React from 'react';
import './style/Visualization.css'; 

function Visualization() {
  const charts = [
    { src: "/images/Top_words_sentiment_analysis.png", title: "Cluster wise avg sentiment" },
    { src: "/images/top_words_frequency.png", title: "Biased cluster analysis" },
    { src: "/images/Review_Length_analysis.png", title: "Review length" },
    { src: "/images/avg_sentiment of top positive and negative words.png", title: "Top word sentiment" },
    { src: "/images/Cluster_distribution.png", title: "Cluster distribution" }
  ];

  return (
    <div className="visualization-page">
      <h2>📊 Data Visualizations</h2>
      <div className="chart-scroll-container">
        {charts.map((chart, index) => (
          <div key={index} className="chart-card">
            <img src={chart.src} alt={chart.title} />
            <p>{chart.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualization;

