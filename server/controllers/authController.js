const User = require('./../models/userModel');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }
};
