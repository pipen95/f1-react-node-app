const Vote = require('../models/voteModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createVote = catchAsync(async (req, res, next) => {
  const newVote = await Vote.create(req.body);
  console.log(newVote);

  if (newVote.rating === 0) {
    return next(
      new AppError('To submit your vote, please enter a rating ', 400)
    );
  }

  res.status(201).json({
    status: 'success',
    data: {
      newVote,
    },
  });
});

exports.getAllVotes = catchAsync(async (req, res) => {
  const votes = await Vote.find(req);
  res.status(200).json({
    status: 'success',
    results: votes.length,
    data: {
      votes,
    },
  });
});

exports.getVote = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateVote = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteVote = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
