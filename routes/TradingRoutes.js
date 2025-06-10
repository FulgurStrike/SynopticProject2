const express = require('express');
const router = express.Router();
const TradingController = require('../controllers/TradingController');
const { authenticateUser } = require('../controllers/AuthenticationController');

router.get('/listings', authenticateUser, TradingController.renderTradingPage);
router.get('/listings/new', authenticateUser, TradingController.renderCreateForm);
router.get('/listings/:id', authenticateUser, TradingController.renderListingDetail);
router.post('/listings', authenticateUser, TradingController.createListing);
router.post('/listings/:id/delete', authenticateUser, TradingController.deleteListing);
router.post('/listings/clear', authenticateUser, TradingController.clearAllListings);
module.exports = router;
