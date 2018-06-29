import mongoose from 'mongoose';

// Declare Schema
const RpsGameSchema = new mongoose.Schema(
  {
    name: { type: String },
    rounds: { type: Number },
    p1: [Number],
    p2: [Number],
    ended: { type: Boolean },
    seen: { type: Boolean },
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
mongoose.model('RpsGame', RpsGameSchema);

// Export Model to be used in Node
export default mongoose.model('RpsGame');
