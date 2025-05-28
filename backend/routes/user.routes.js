import express from "express";
import { signup, signin } from "../controllers/user.controller.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

; 

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
        console.log("Signup route accessed"); 
        await signup(req, res); 
    } catch (error) {
        console.error("Error in /signup route:", error.message);
        res.status(500).json({ message: "Internal server error during signup." });
    }
});


router.post("/signin", async (req, res) => {
    try {
        console.log("Signin route accessed"); 
        await signin(req, res); 
    } catch (error) {
        console.error("Error in /signin route:", error.message);
        res.status(500).json({ message: "Internal server error during login." });
    }
});


router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();  
        res.json(products);  
    } catch (error) {
        res.status(500).json({ message: "Error fetching products." });
    }
});


router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product details." });
    }
});

export default router;



