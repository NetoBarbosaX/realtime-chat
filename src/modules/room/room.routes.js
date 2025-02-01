const express = require('express');
const roomController = require('./room.controller');

const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/:id', roomController.getRoom);
router.get('/', roomController.getAllRooms);


module.exports = router;
