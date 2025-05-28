import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  asin: { type: String },
  'reviewer id': { type: String },
  'reviewer name_x': { type: String },
  'reviewer helpfulvote': { type: Number },
  similarity_with_description: { type: Number },
  similarity_with_features: { type: Number },
  similarity_with_category: { type: Number },
  similarity_with_brand: { type: Number },
  similarity_with_producttitle: { type: Number },
  rating_deviation: { type: Number },
  sentiment_score: { type: Number },
  positive_score: { type: Number },
  negative_score: { type: Number },
  neutral_score: { type: Number },
  sentiment: { type: String },
}, { collection: 'features' });

export default mongoose.model('Feature', featureSchema);

