const express = require('express');
const router = express.Router();
const CropDatabaseController = require('../controllers/CropDatabaseController');

router.get("/cropPage", CropDatabaseController.renderCropPage);
router.post("/cropPage/sort", CropDatabaseController.sortBy);

module.exports = router;
