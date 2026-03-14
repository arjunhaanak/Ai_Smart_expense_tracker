const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', predictionController.generatePrediction);
router.get('/latest', predictionController.getLatestPrediction);

module.exports = router;
