const mongoose = require("mongoose");
// const User = require("./userModel");
// const validator = require("validator");

const voteSchema = new mongoose.Schema({
  driverId: String,
  country: String,
  region: String,
  city: String,
  infoConsent: String,
  rating: Number,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A vote must belong to a user"],
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
