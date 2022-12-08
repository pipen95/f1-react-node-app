const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  circuitId: String,
  season: Number,
  result: [
    {
      id: String,
      name: String,
      country: String,
      position: Number,
      bonus: [],
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
