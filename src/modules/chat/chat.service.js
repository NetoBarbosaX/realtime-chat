const prisma = require('../../database/prismaClient');

async function saveMessage({ userId, roomId, content }) {
  return prisma.message.create({
    data: {
      userId,
      roomId, 
      content,
    },
  });
}

async function getMessagesByRoom(roomId) {
  return prisma.message.findMany({
    where: { roomId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: true, 
      room: true, 
    },
  });
}

module.exports = {
  saveMessage,
  getMessagesByRoom,
};
