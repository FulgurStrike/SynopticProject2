const express = require('express');
const router = express.Router();
const listingController = require('../controllers/ListingController');

router.get('/listings', listingController.getAllListings);
router.get('/listings/new', listingController.getNewListingForm);
router.post('/listings', listingController.createListing);

module.exports = router;