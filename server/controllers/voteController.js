const Vote = require("./../models/voteModel");

exports.createVote = async (req, res) => {
  try {
    const newVote = await Vote.create(req.body);
    console.log(newVote);

    if (rating === 0) {
      return next(
        new AppError("To submit your vote, please enter a rating ", 400)
      );
    }

    res.status(201).json({
      status: "success",
      data: {
        vote: newVote,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
