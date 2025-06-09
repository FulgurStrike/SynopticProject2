const express = require('express');
const router = express.Router();
const CropDatabaseController = require('../controllers/CropDatabaseController');

router.get("/cropPage", CropDatabaseController.renderCropPage);
router.post("/cropPage/sort", CropDatabaseController.sortBy);
router.post("/cropPage/filter", CropDatabaseController.filterBy);
router.post("/cropPage/search", CropDatabaseController.search)
router.get("/cropItemPage/:id", CropDatabaseController.renderCropItemPage);

module.exports = router;
