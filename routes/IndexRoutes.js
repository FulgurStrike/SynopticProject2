// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController'); // This imports all exports from IndexController.js

// This route will handle requests to "/" (your root path)
// and use the renderIndexPage function from your IndexController
router.get("/", IndexController.renderIndexPage);

module.exports = router;