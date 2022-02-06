const express = require('express');
const voteController = require('../controllers/voteController');

const router = express.Router();

router
  .route('/')
  .post(voteController.createVote)
  .get(voteController.getAllVotes);

module.exports = router;
