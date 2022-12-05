const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  circuitId: String,
  raceName: String,
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

const Vote = mongoose.model('Result', resultSchema);

module.exports = Vote;
