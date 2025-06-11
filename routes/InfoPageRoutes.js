// routes/InfoPageRoutes.js
const express = require('express');
const router = express.Router();
const InfoController = require ('../controllers/InfoController');

router.get("/AboutUs", InfoController.renderInfoPage);

module.exports = router;