const mongoose = require('mongoose');
// const User = require('./userModel');
// const validator = require("validator");

const voteSchema = new mongoose.Schema({
  votedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  circuitId: String,
  season: Number,
  dateCreated: Date,
  vote: [
    {
      id: String,
      position: Number,
      bonus: {
        type: [String],
      },
    },
  ],

  // Output
  // vote: [{
  //         "id": "albon",
  //         "position": 10,
  //         "bonus":["dod","ok","fl"]
  //     }]
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;

// Populate Method
// Then, when you make your query, you can populate references like this:
// Post.findOne({_id: 123})
// .populate('postedBy')
// .exec(function(err, post) {
//     // do stuff with post
// });
