const express = require('express');
const router = express.Router();
const CropRecommendationController = require('../controllers/CropRecommendationController');

router.get('/cropRecommendation', CropRecommendationController.renderCropRecommendationPage);

router.post('/cropRecommendation/predict', CropRecommendationController.getPrediction);


module.exports = router;
