const express = require('express');
const router = express.Router();
const tradingController = require('../controllers/TradingController');

router.get('/trading', tradingController.renderTradingPage);

module.exports = router;
