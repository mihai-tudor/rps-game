import mongoose from 'mongoose';

// Declare Schema
const RpsGameSchema = new mongoose.Schema(
  {
    p1_name: { type: String },
    p2_name: { type: String },
    p1_rounds: [Number],
    p2_rounds: [Number],
    rounds: { type: Number },
    ended: { type: Boolean }
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
mongoose.model('RpsGame', RpsGameSchema);

// Export Model to be used in Node
export default mongoose.model('RpsGame');
