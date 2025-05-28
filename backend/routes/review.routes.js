import express from 'express';
import Review from '../models/review.model.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/:asin', async (req, res) => {
  try {
    const asin = req.params.asin.toUpperCase();

    const BiasModel = mongoose.connection.collection('cluster-lable');
    const FeatureModel = mongoose.connection.collection('features');

    const reviews = await Review.find({
      asin: { $regex: new RegExp(`^${asin}$`, 'i') },
    });

    console.log("📦 Reviews found:", reviews.length);
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    console.log("🔍 Sample review fields:", Object.keys(reviews[0]._doc || reviews[0]));

    const reviewerIds = reviews.map((r) => {
      const doc = r._doc || r;
      const reviewerId =
        doc['reviewer id'] ||
        doc['reviewer id_x'] ||
        doc.reviewerId ||
        doc.reviewerID;
      return reviewerId?.toString().toLowerCase().trim();
    }).filter(Boolean);

    console.log("✅ Extracted Reviewer IDs:", reviewerIds.length, reviewerIds.slice(0, 5));

    const [biasData, featureData] = await Promise.all([
      BiasModel.find({
        asin: { $regex: new RegExp(`^${asin}$`, 'i') },
        $expr: { $in: [{ $toLower: "$reviewer id" }, reviewerIds] }
      }).toArray(),
      FeatureModel.find({
        asin: { $regex: new RegExp(`^${asin}$`, 'i') },
        $expr: { $in: [{ $toLower: "$reviewer id" }, reviewerIds] }
      }).toArray(),
    ]);

    console.log("📊 Bias records fetched:", biasData.length);
    console.log("📊 Feature records fetched:", featureData.length);

    const biasMap = new Map();
    biasData.forEach(b => {
      const id = b['reviewer id']?.toString().toLowerCase().trim();
      if (id) biasMap.set(id, b);
    });

    const featureMap = new Map();
    featureData.forEach(f => {
      const id = f['reviewer id']?.toString().toLowerCase().trim();
      if (id) featureMap.set(id, f);
    });

    const enrichedReviews = reviews.map((r) => {
      const doc = r._doc || r;
      const reviewerId = (
        doc['reviewer id'] ||
        doc['reviewer id_x'] ||
        doc.reviewerId ||
        doc.reviewerID ||
        ''
      ).toString().toLowerCase().trim();

      const bias = biasMap.get(reviewerId);
      const feature = featureMap.get(reviewerId);

      return {
        _id: r._id,
        reviewerName: doc.reviewerName || doc['reviewer name_x'] || 'Unknown',
        reviewTitle: doc.reviewTitle || doc['review title_x'] || '',
        reviewText: doc.reviewText || doc['review text_x'] || '',
        reviewRating: doc.reviewRating || doc['review rating'] || 0,
        verifiedPurchase: doc.verifiedPurchase ?? doc['verified purchase_x'] ?? false,
        reviewerId,
        biasStatus: bias?.Bias_Status ?? bias?.bias_label ?? null,
        features: feature ? {
          sentiment: feature.sentiment ?? 'N/A',
          ratingDeviation: feature.rating_deviation ?? 'N/A',
          similarityWithDescription: feature.similarity_with_description ?? 'N/A',
          similarityWithFeatures: feature.similarity_with_features ?? 'N/A',
        } : null,
      };
    });

    return res.json(enrichedReviews);
  } catch (err) {
    console.error("❌ Error fetching enriched reviews:", err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;






