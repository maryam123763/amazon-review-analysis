const Review = require('../models/review');
const BiasLabel = require('../models/bias.model');
const Feature = require('../models/feature.model');


// Assuming you're using Express.js

const getProductReviews = async (req, res) => {
  try {
    const asin = req.params.asin;

    // Get main reviews
    const reviews = await Review.find({ asin });

    // Get bias and feature data
    const biasData = await BiasLabel.find({ asin });
    const featureData = await Feature.find({ asin });

    // Convert to maps for fast lookup
    const biasMap = new Map();
    biasData.forEach(item => {
      biasMap.set(item['reviewer id'], item.Bias_Status);
    });

    const featureMap = new Map();
    featureData.forEach(item => {
      featureMap.set(item['reviewer id'], item); // Full object if needed
    });

    // Attach Bias and Feature info to each review
    const enrichedReviews = reviews.map(review => {
      const reviewerId = review['reviewer id'];
      return {
        ...review._doc,
        biasStatus: biasMap.get(reviewerId) || 'Unknown',
        features: featureMap.get(reviewerId) || {},
      };
    });

    res.json(enrichedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

