const roomService = require('./room.service');

async function createRoom(req, res) {
  try {
    const { name } = req.body; 
    const room = await roomService.createRoom(name);
    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating room' });
  }
}

async function getRoom(req, res) {
  try {
    const { id } = req.params; 
    const room = await roomService.findRoomById(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    return res.json(room);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching room' });
  }
}

async function getAllRooms(req, res) {
  try {
    const rooms = await roomService.listRooms();
    return res.json(rooms);
  } catch (error) {
    return res.status(500).json({ error: 'Error listing rooms' });
  }
}

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
};
