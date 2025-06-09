const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');
const { authenticateUser } = require('../controllers/AuthenticationController');

router.get('/messages', authenticateUser, MessageController.userDashboard);
router.post('/messages/from-listing/:listingID', authenticateUser, MessageController.sendFromListing);
router.get('/messages/conversation/:userId', authenticateUser, MessageController.conversationWithUser);
router.post('/messages/reply/:userId', authenticateUser, MessageController.replyToUser);

module.exports = router;