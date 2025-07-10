const mockFindUnique = jest.fn();

jest.mock('../../utils/prisma', () => ({
  prisma: {
    user: {
      findUnique: mockFindUnique,
    },
  },
}));

import { getUserById } from "../../services/user.service";

describe('getUserById', () => {
  it('should return user when found', async () => {
    const mockUser = { id: 1, email: 'test@example.com', createdAt: new Date() };
    mockFindUnique.mockResolvedValue(mockUser);

    const user = await getUserById(1);

    expect(user).toEqual(mockUser);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: { id: true, email: true, createdAt: true },
    });
  });

  it('should return null when user not found', async () => {
    mockFindUnique.mockResolvedValue(null);

    const user = await getUserById(999);

    expect(user).toBeNull();
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 999 },
      select: { id: true, email: true, createdAt: true },
    });
  });
});

