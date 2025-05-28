import mongoose from 'mongoose';

const biasSchema = new mongoose.Schema({
  asin: { type: String },
  'reviewer id': { type: String },
  Bias_Status: { type: String },
  cluster: { type: Number },
}, { collection: 'cluster-lable' }); // 👈 Matches actual collection name

export default mongoose.model('BiasLabel', biasSchema);
