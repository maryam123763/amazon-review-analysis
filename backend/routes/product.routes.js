import express from 'express';
import Product from '../models/product.model.js';

const router = express.Router();

/**
 * ✅ 1. Get paginated list of unique products by ASIN
 * 👉 GET /api/products?page=1&limit=6
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const products = await Product.aggregate([
      {
        $group: {
          _id: "$ASIN", // Group by ASIN
          doc: { $first: "$$ROOT" } // Pick the first product in each group
        }
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $skip: skip },
      { $limit: limit }
    ]);

    // Total unique ASIN count
    const totalCountAgg = await Product.aggregate([
      { $group: { _id: "$ASIN" } },
      { $count: "total" }
    ]);
    const totalCount = totalCountAgg[0]?.total || 0;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ products, totalPages });
  } catch (error) {
    console.error("❌ Error fetching unique products:", error.message);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

/**
 * ✅ 2. Get product details (image + productId + title) by ASIN
 * 👉 GET /api/products/:asin
 */
router.get("/:asin", async (req, res) => {
  try {
    const asin = req.params.asin.toUpperCase();
    console.log("🔍 Looking for product with ASIN:", asin);

    const product = await Product.findOne({
      ASIN: { $regex: new RegExp(`^${asin}$`, "i") },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found for this ASIN." });
    }

    // Fetch all reviews for this product
    const reviews = await Product.find({ ASIN: asin });

    res.json(reviews); // frontend expects an array of reviews for this ASIN
  } catch (error) {
    console.error("❌ Error fetching product details:", error.message);
    res.status(500).json({ message: "Server error while fetching product." });
  }
});

export default router;


    



