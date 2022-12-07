const Result = require('../models/voteModel');
const catchAsync = require('../utils/catchAsync');

exports.createResult = catchAsync(async (req, res, next) => {
  const newResult = await Result.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newResult,
    },
  });
});

exports.updateResult = catchAsync(async (req, res, next) => {
  const updatedVote = await Result.findOneAndUpdate(
    { year: req.params.year, race: req.params.race },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedVote) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedResult,
    },
  });
});
