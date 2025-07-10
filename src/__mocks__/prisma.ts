export const mockCreate = jest.fn();
export const mockFindMany = jest.fn();
export const mockFindUnique = jest.fn();

export const prisma = {
  order: {
    create: mockCreate,
    findMany: mockFindMany,
  },
  product: {
    findMany: mockFindMany,
    findUnique: mockFindUnique,
    create: mockCreate,
  },
  user: {
    findUnique: mockFindUnique,
  },
};