const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router();

router.route('/').post(resultController.createResult);

router.route('/:year-:race').patch(resultController.updateResult);

module.exports = router;
