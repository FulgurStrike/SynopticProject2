const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/signup', UserController.renderSignupPage);
router.post('/createaccount', UserController.registerUser);

module.exports = router;