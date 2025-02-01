const express = require('express');
const chatRoutes = require('./chat/chat.routes');
const userRoutes = require('./user/user.routes');
const roomRoutes = require('./room/room.routes');
const router = express.Router();

router.use('/chat', chatRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;
