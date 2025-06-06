const express = require('express');
const router = express.Router();
const CropDatabaseController = require('../controllers/CropDatabaseController');

router.get("/cropPage", CropDatabaseController.renderCropPage);
router.get("/cropItemPage/:id", CropDatabaseController.renderCropItemPage);

module.exports = router;
