import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { asin } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [visibleFeatureIds, setVisibleFeatureIds] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${asin}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProduct(data[0] || null);
        } else if (Array.isArray(data.products)) {
          setProduct(data.products[0] || null);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

 // Inside fetchReviews function
const fetchReviews = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/reviews/${asin}`);
    if (!res.ok) throw new Error("Reviews not found");
    const data = await res.json();
    console.log("✅ Reviews fetched from backend:", data);

    if (Array.isArray(data)) {
      data.forEach((review, i) => {
        console.log(`🔍 Review ${i + 1}: reviewerId=${review.reviewerId}, biasStatus=${review.biasStatus}`);
        console.log("   ➤ Features:", review.features);
      });
    }

    setReviews(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    setReviews([]);
  }
};


    fetchProduct();
    fetchReviews();
  }, [asin]);

  const toggleFeatures = (reviewId) => {
    setVisibleFeatureIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="detail-container">
      
      <div className="left-section">
        <h2>Product Detail</h2>

        {product ? (
          <>
            <img
              src={
                product["Product Image"] ||
                product.productImage ||
                "https://placehold.co/200x200?text=No+Image"
              }
              alt={product["productTitle"] || product.productTitle || "Product"}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/200x200?text=No+Image";
              }}
            />

            <div className="product-summary">
              <h3>{product["productTitle"] || product.productTitle}</h3>
              <p>
                <strong>Brand:</strong> {product["Brand Name"] || product.brandName}
              </p>
              <p>
                <strong>Price:</strong> ₹{product["Price"] || product.price}
              </p>
              <p>
                <strong>Category:</strong> {product["Category"] || product.category}
              </p>
              <p>
                <strong>ASIN:</strong> {product["ASIN"] || product.asin}
              </p>
              <p>
                <strong>Average Rating:</strong> ⭐ {product["Average Rating"] || product.averageRating}
              </p>
              <p>
                <strong>Total Ratings:</strong> {product["Total Rating"] || product.totalRating}
              </p>
              <p className="short-description">
                <strong>Description:</strong>{" "}
                {product["Description"]?.slice(0, 150) ||
                  product.description?.slice(0, 150) ||
                  "No description"}
                ...
              </p>
              <p>
                <strong>Top Features:</strong> {product["Features"] || product.features || "Not Available"}
              </p>
            </div>

            <button className="detail-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>

     
      <div className="right-section">
        <h2>Reviews</h2>
        {reviews.length === 0 && <p>No reviews found for this product.</p>}

        <div className="detail-review-container">
          {reviews.map((review) => (
            <div key={review._id} className="detail-review-card">
              <div className="detail-review-header">
                <div className="detail-reviewer-icon">
                  {review.reviewerName?.charAt(0).toUpperCase() || "U"}
                </div>
                <h4>{review.reviewerName || "Unknown"}</h4>
              </div>

              <p className="detail-review-title">{review.reviewTitle}</p>
              <p className="detail-review-text">{review.reviewText}</p>

              <div className="detail-review-meta">
                <span>Rating: {review.reviewRating} ⭐</span>
                {review.verifiedPurchase && <span> ✔ Verified Purchase</span>}
                <br />
                <span>
                  <b>Bias Status:</b>{" "}
                  {review.biasStatus !== null && review.biasStatus !== undefined
                    ? review.biasStatus === 1
                      ? "Biased"
                      : "Unbiased"
                    : "unknown"}
                </span>
              </div>

             <button
  className="feature-toggle-button"
  onClick={() => toggleFeatures(review._id)}
>
  Show Features ▼
</button>

{visibleFeatureIds.includes(review._id) && (
  <div className="feature-dropdown">
    {review.features ? (
      <>
        <p><strong>Sentiment:</strong> {review.features.sentiment}</p>
        <p><strong>Rating Deviation:</strong> {review.features.ratingDeviation}</p>
        <p><strong>Similarity with Description:</strong> {review.features.similarityWithDescription}</p>
        <p><strong>Similarity with Features:</strong> {review.features.similarityWithFeatures}</p>
      </>
    ) : (
      <p>Feature data not found</p>
    )}
  </div>
)}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
















