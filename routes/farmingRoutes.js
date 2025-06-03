const express = require('express');
const router = express.Router();
const FarmingController = require ('../controllers/farmingController');

router.get("/farming", FarmingController.renderFarmingPage);

module.exports = router;
