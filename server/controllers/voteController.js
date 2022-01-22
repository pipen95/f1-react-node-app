const Vote = require("./../models/voteModel");

exports.getVotes = async (req, res) => {
  try {
    const allVotes = await Vote.find();

    res.status(200).json({
      status: "success",
      data: {
        allVotes,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesage: error,
    });
  }
};

exports.createVote = async (req, res) => {
  try {
    const newVote = await Vote.create(req.body);
    console.log(newVote);

    if (newVote.rating === 0) {
      return next(
        new AppError("To submit your vote, please enter a rating ", 400)
      );
    }

    res.status(201).json({
      status: "success",
      data: {
        newVote,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesage: error,
    });
  }
};

exports.getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find(req);
    res.status(200).json({
      status: "success",
      results: votes.length,
      data: {
        votes,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesage: error,
    });
  }
};
