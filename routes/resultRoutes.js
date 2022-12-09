const express = require('express');
// const authController = require('../controllers/authController');
const resultController = require('../controllers/resultController');

const router = express.Router();

// Restrict these routes to admin
// router.use(authController.restrictTo('admin'));

router.route('/').post(resultController.createResult);
router.route('/:year-:race').get(resultController.checkResult);
router.route('/:year-:race').patch(resultController.updateResult);

module.exports = router;
