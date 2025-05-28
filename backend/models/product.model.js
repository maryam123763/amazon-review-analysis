import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productTitle: { type: String, required: true, index: true },
    ASIN: { type: String, unique: true },
    Price: { type: String },
    Category: { type: String },
    Features: { type: String },
    productImage: { type: String },
    BrandName: { type: String },
    TotalRating: { type: Number },
    AverageRating: { type: Number },
    Description: { type: String },
  },
  { collection: "ProductDetails", timestamps: true }
);

productSchema.index({ productTitle: 1 });


const Product = mongoose.models.Product || mongoose.model("Product", productSchema, "ProductDetails");
export default Product;






