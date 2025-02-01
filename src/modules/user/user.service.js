const prisma = require('../../database/prismaClient');

async function createUser({ username }) {
  return prisma.user.create({
    data: { username },
  });
}

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

module.exports = {
  createUser,
  findUserById,
};
