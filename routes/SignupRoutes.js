const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/signup', UserController.renderSignupPage);
router.post('/signup', UserController.registerUser);

module.exports = router;