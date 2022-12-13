const Result = require('../models/resultModel');
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

exports.checkResult = catchAsync(async (req, res, next) => {
  const result = await Result.findOne({
    season: `${req.params.year}`,
    circuitId: `${req.params.race}`,
  });

  if (result !== null) {
    res.status(200).json({
      status: 'success',
      data: true,
    });
  } else if (result === null) {
    res.status(200).json({
      status: 'success',
      data: false,
    });
  } else {
    return next(new AppError('There is a problem', 404));
  }
});

exports.updateResult = catchAsync(async (req, res, next) => {
  const updatedResult = await Result.findOneAndUpdate(
    { season: req.params.year, circuitId: req.params.race },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(req.body);

  if (!updatedResult) {
    return next(new AppError('No document found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedResult,
    },
  });
});
