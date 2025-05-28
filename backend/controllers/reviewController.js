const Review = require('../models/review');
const BiasLabel = require('../models/bias.model');
const Feature = require('../models/feature.model');




const getProductReviews = async (req, res) => {
  try {
    const asin = req.params.asin;

   
    const reviews = await Review.find({ asin });


    const biasData = await BiasLabel.find({ asin });
    const featureData = await Feature.find({ asin });

    
    const biasMap = new Map();
    biasData.forEach(item => {
      biasMap.set(item['reviewer id'], item.Bias_Status);
    });

    const featureMap = new Map();
    featureData.forEach(item => {
      featureMap.set(item['reviewer id'], item); 
    });

    
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

