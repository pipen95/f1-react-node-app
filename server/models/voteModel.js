const mongoose = require("mongoose");
// const validator = require("validator");

const voteSchema = new mongoose.Schema({
  driverId: String,
  country: String,
  region: String,
  city: String,
  name: String,
  infoConsent: String,
  rating: Number,
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
