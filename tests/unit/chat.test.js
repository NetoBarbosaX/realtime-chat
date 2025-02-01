const chatService = require('../../src/modules/chat/chat.service');
const prisma = require('../../src/database/prismaClient');

jest.mock('../../src/database/prismaClient', () => ({
  message: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe('Chat Service - Unit Tests', () => {
  it('should create a new message', async () => {
    prisma.message.create.mockResolvedValue({
      id: 'message-123',
      userId: 'user-abc',
      roomId: 'room-xyz',
      content: 'Hello World!',
      createdAt: new Date(),
    });

    const data = {
      userId: 'user-abc',
      roomId: 'room-xyz',
      content: 'Hello World!',
    };
    const result = await chatService.saveMessage(data);

    expect(prisma.message.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-abc',
        roomId: 'room-xyz',
        content: 'Hello World!',
      },
    });
    expect(result.id).toBe('message-123');
    expect(result.content).toBe('Hello World!');
  });

  it('should get messages by room', async () => {
    prisma.message.findMany.mockResolvedValue([
      {
        id: 'message-100',
        userId: 'user-123',
        roomId: 'room-xyz',
        content: 'Testing 1',
        createdAt: new Date(),
      },
      {
        id: 'message-101',
        userId: 'user-123',
        roomId: 'room-xyz',
        content: 'Testing 2',
        createdAt: new Date(),
      },
    ]);

    const messages = await chatService.getMessagesByRoom('room-xyz');
    expect(prisma.message.findMany).toHaveBeenCalledWith({
      where: { roomId: 'room-xyz' },
      orderBy: { createdAt: 'desc' },
      include: { user: true, room: true },
    });
    expect(messages).toHaveLength(2);
    expect(messages[0].id).toBe('message-100');
  });
});
