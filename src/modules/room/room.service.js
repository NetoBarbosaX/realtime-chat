const prisma = require('../../database/prismaClient');

async function createRoom(name) {
  return prisma.room.create({ data: { name } });
}

async function findRoomById(id) {
  return prisma.room.findUnique({ where: { id } });
}

async function listRooms() {
  return prisma.room.findMany();
}

module.exports = {
  createRoom,
  findRoomById,
  listRooms,
};
