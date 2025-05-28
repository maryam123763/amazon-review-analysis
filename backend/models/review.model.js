
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  asin: { type: String, required: true }, 
  reviewerName: { type: String },
  'reviewer name_x': { type: String },
  reviewTitle: String,
  'review title_x': String,
  reviewText: String,
  'review text_x': String,
  reviewRating: { type: Number },
  'review rating': { type: Number },
  reviewHelpfulVote: { type: Number, default: 0 },
  'review helpful vote_x': { type: Number },
  location: String,
  location_x: String,
  verifiedPurchase: { type: Boolean, default: false },
  'verified purchase_x': Boolean,
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;


