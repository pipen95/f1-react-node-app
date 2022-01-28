const mongoose = require("mongoose");
// const User = require("./userModel");
// const validator = require("validator");

const voteSchema = new mongoose.Schema({
  name: String,
  driverId: String,
  infoConsent: String,
  rating: Number,
  message: String,
  country: {
    // GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    name: String,
    iso: String,
  },
  region: {
    // GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    name: String,
    iso: String,
  },

  city: String,
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
