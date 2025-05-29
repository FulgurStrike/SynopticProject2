const express = require('express');
const router = express.Router();
const CropRecommendationController = require('../controllers/CropRecommendationController');

router.get('/cropRecommendation', CropRecommendationController.renderCropRecommendationPage);

module.exports = router;
