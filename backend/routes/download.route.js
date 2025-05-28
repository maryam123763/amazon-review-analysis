// routes/download.route.js
import express from "express";
import Product from "../models/product.model.js";
import { Parser } from "json2csv";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    const parser = new Parser();
    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("ProductDetails.csv");
    return res.send(csv);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Failed to download dataset" });
  }
});

export const downloadRoutes = router;

