const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  circuitId: String,
  raceName: String,
  season: Number,
  vote: [
    {
      id: String,
      name: String,
      country: String,
      position: Number,
      bonus: [],
    },
  ],

  votedBy: {
    type: mongoose.ObjectId,
    default: '62182ff2bda82e9b8e3646c8',
    required: [true],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
