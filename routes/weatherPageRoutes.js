const express = require('express');
const router = express.Router();
const weatherPageController = require('../controllers/weatherPageController');

router.get("/weatherPage", weatherPageController.renderWeatherPage);

module.exports = router;
