const Vote = require('../models/voteModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createVote = catchAsync(async (req, res, next) => {
  const newVote = await Vote.create(req.body);
  console.log(newVote);

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

exports.updateVote = catchAsync(async (req, res) => {
  console.log(JSON.stringify(req.body));

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'votedBy');

  // 3) Update user document
  const updatedVote = await Vote.findByIdAndUpdate(req.vote.id, filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      vote: updatedVote,
    },
  });
});

exports.deleteVote = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
