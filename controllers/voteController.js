const Vote = require('../models/voteModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createVote = catchAsync(async (req, res, next) => {
  const newVote = await Vote.create(req.body);

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

exports.getVote = catchAsync(async (req, res, next) => {
  const vote = await Vote.findOne({ votedBy: req.params.id }).sort({
    field: 'asc',
    _id: -1,
  });

  console.log(vote);

  if (!vote) {
    console.log('no vote');
    return next(new AppError('Cant find a vote', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      vote,
    },
  });
});

exports.updateVote = catchAsync(async (req, res, next) => {
  const updatedVote = await Vote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedVote) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedVote,
    },
  });
});

exports.deleteVote = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
