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
  const result = await Result.find({
    year: req.params.year,
    race: req.params.race,
  });

  console.log(result);

  if (Array.isArray(result) && result.length) {
    res.status(200).json({
      status: 'success',
      data: true,
    });
  } else if (Array.isArray(result) && !result.length) {
    res.status(200).json({
      status: 'success',
      data: false,
    });
  } else {
    return next;
  }
});

exports.updateResult = catchAsync(async (req, res, next) => {
  const updatedResult = await Result.findOneAndUpdate(
    { year: req.params.year, race: req.params.race },
    req.body,
    {
      new: true,
    }
  );

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
