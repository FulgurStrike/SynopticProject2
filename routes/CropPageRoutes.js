const express = require('express');
const router = express.Router();
const CropDatabaseController = require('../controllers/CropDatabaseController');

router.get("/", CropDatabaseController.renderCropPage);

module.exports = router;
