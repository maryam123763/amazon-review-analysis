import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import "./ProductsList.css";

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log(`📡 Fetching products for Page: ${page}`);
                const response = await fetch(`http://localhost:5000/api/products?page=${page}&limit=${limit}`);
                const data = await response.json();

                console.log("🔄 API Response:", JSON.stringify(data, null, 2));

                setProducts(data.products || []);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [page]); // Run effect when page changes

    return (
        <div className="products-container">
            <h2 className="title">Products List</h2>

            {products.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <ul className="products-list">
                    {products.map((product) => (
                        <li key={product._id} className="product-card">
                            <img 
                                src={product["Product Image"] || "https://via.placeholder.com/150"} 
                                alt={product["productTitle"] || "Product"} 
                                className="product-image" 
                            />
                            <h3 className="product-title">{product["productTitle"]}</h3>
                            <p className="product-price">
                                Price: {product["Price"] ? `₹${product["Price"]}` : "Not Available"}
                            </p>
                            {/* ✅ Use Link instead of <a> */}
                            <Link to={`/product/${product["ASIN"]}`} className="view-details-btn">
                                View Details
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <div className="pagination">
                <button 
                    className="page-btn"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    ⬅️ Previous
                </button>

                <span className="total-pages">Page {page} of {totalPages}</span>

                <button 
                    className="page-btn"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                >
                    Next ➡️
                </button>
            </div>
        </div>
    );
};

export default ProductsList;

























