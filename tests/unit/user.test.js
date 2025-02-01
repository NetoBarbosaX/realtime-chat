const userService = require('../../src/modules/user/user.service');
const prisma = require('../../src/database/prismaClient');

// Mocka o prismaClient para impedir que ele acesse o DB de verdade
jest.mock('../../src/database/prismaClient', () => ({
  user: {
    create: jest.fn(),
  },
}));

describe('User Service - Unit Tests', () => {
  it('should create a new user', async () => {
    prisma.user.create.mockResolvedValue({
      id: 'user-123',
      username: 'Alice',
    });

    // Chama o service
    const result = await userService.createUser({ username: 'Alice' });

    // Verifica se a função foi chamada corretamente
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { username: 'Alice' },
    });

    // Verifica o valor retornado
    expect(result).toEqual({
      id: 'user-123',
      username: 'Alice',
    });
  });
});
