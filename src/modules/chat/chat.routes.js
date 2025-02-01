const express = require('express');
const chatController = require('./chat.controller');

const router = express.Router();

router.post('/messages', chatController.postMessage);
router.get('/messages/:userId', chatController.getUserMessages);

module.exports = router;
