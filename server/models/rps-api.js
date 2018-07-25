import mongoose from 'mongoose';
import { isErrorRoundsNumber, isErrorRoundNumber } from '../../src/common/formValidation'

const validateArrayForRounds = {
  validator(array) {
    if (array === null) { return true; }
    const validateArrayItems = array.every((n) => typeof n === 'number' && !isErrorRoundNumber(n));
    const validateArraySize = array.length === this.rounds;
    return validateArrayItems && validateArraySize;
  },
  message: 'Rounds array can contain only number between 0-2 and the size must be same as rounds value!'
};

const validateArrayForWonRounds = {
  validator(array) {
    if (array === null) { return true; }
    const validateArrayItems = array.every((n) => typeof n === 'boolean' || n === null);
    const validateArraySize = array.length === this.rounds;
    return validateArrayItems && validateArraySize;
  },
  message: 'Rounds won array can contain only boolean or null and the size must be same as rounds value!'
};

const validateRounds = {
  validator(number) {
    return !isErrorRoundsNumber(number);
  },
  message: 'Rounds can only be 1, 3, 5, 8, 10!'
};

const nameProps = {
  type: String,
  trim: true,
  minlength: [2, 'Name too short, min 2!'],
  maxlength: [15, 'Name too long, max 15!']
};

// Declare Schema
const RpsGameSchema = new mongoose.Schema(
  {
    p1_name: {
      ...nameProps,
      required: true
    },
    p2_name: {
      ...nameProps
    },
    p1_rounds: {
      type: Array,
      validate: validateArrayForRounds,
      required: true
    },
    p2_rounds: {
      type: Array,
      validate: validateArrayForRounds
    },
    rounds: {
      type: Number,
      validate: validateRounds,
      required: true
    },
    ended: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Number
    },
    p1_rounds_won: {
      type: Array,
      validate: validateArrayForWonRounds
    },
    p2_rounds_won: {
      type: Array,
      validate: validateArrayForWonRounds
    }
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
mongoose.model('RpsGame', RpsGameSchema);

// Export Model to be used in Node
export default mongoose.model('RpsGame');
