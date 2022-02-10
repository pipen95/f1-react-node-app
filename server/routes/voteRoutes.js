const express = require('express');
const voteController = require('../controllers/voteController');

const router = express.Router();

router
  .route('/')
  .post(voteController.createVote)
  .get(voteController.getAllVotes);

router
  .route('/:id')
  .get(voteController.getVote)
  .patch(voteController.updateVote)
  .delete(voteController.deleteVote);

module.exports = router;
