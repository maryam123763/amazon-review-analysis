import Review from '../models/review.model.js';

export const getBiasStatus = async (req, res) => {
  const { asin } = req.params;

  try {
    const reviews = await Review.find({
      asin: { $regex: new RegExp(`^${asin}$`, 'i') },
    });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    let biasedCount = 0;
    let unbiasedCount = 0;

    reviews.forEach((review) => {
      const text = review.reviewText || review['review text_x'] || '';
      const rating = review.reviewRating || review['review rating'] || 0;

      // Simple bias logic:
      if (text.length < 50 || rating === 5 || rating === 1) {
        biasedCount++;
      } else {
        unbiasedCount++;
      }
    });

    return res.status(200).json({
      asin,
      totalReviews: reviews.length,
      biased: biasedCount,
      unbiased: unbiasedCount,
    });
  } catch (error) {
    console.error('Error computing bias status:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
