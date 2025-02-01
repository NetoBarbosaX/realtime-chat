const roomService = require('../../src/modules/room/room.service');
const prisma = require('../../src/database/prismaClient');

jest.mock('../../src/database/prismaClient', () => ({
  room: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe('Room Service - Unit Tests', () => {
  it('should create a new room', async () => {
    prisma.room.create.mockResolvedValue({
      id: 'room-xyz',
      name: 'Test Room',
    });

    const result = await roomService.createRoom('Test Room');

    expect(prisma.room.create).toHaveBeenCalledWith({
      data: { name: 'Test Room' },
    });
    expect(result).toEqual({ id: 'room-xyz', name: 'Test Room' });
  });

  it('should find a room by id', async () => {
    prisma.room.findUnique.mockResolvedValue({
      id: 'room-xyz',
      name: 'Test Room',
    });

    const room = await roomService.findRoomById('room-xyz');
    expect(prisma.room.findUnique).toHaveBeenCalledWith({
      where: { id: 'room-xyz' },
    });
    expect(room).toEqual({ id: 'room-xyz', name: 'Test Room' });
  });

  it('should list all rooms', async () => {
    prisma.room.findMany.mockResolvedValue([
      { id: 'room-xyz', name: 'Room A' },
      { id: 'room-abc', name: 'Room B' },
    ]);

    const rooms = await roomService.listRooms();
    expect(prisma.room.findMany).toHaveBeenCalled();
    expect(rooms).toHaveLength(2);
    expect(rooms[0].id).toBe('room-xyz');
  });
});
