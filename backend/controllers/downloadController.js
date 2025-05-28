import { Parser } from 'json2csv';
import Product from '../models/product.js';  // Adjust based on your model

export const downloadDataset = async (req, res) => {
  try {
    // Fetch the dataset (e.g., products)
    const products = await Product.find(); // Adjust according to your data

    // Convert JSON to CSV
    const parser = new Parser();
    const csv = parser.parse(products);

    // Set headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    res.send(csv);

  } catch (error) {
    res.status(500).json({ message: 'Error downloading dataset', error });
  }
};
