import { mockCreate, mockFindMany } from '../../__mocks__/prisma';
import { createOrderForUser, getOrdersByUser } from '../../services/order.service';

jest.mock('../../utils/prisma', () => ({
  prisma: {
    order: {
      create: mockCreate,
      findMany: mockFindMany,
    },
  },
}));

describe('order.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create an order with products', async () => {
      const mockOrder = {
        id: 1,
        userId: 1,
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      };

      mockCreate.mockResolvedValue(mockOrder);

      const result = await createOrderForUser(1, [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ]);

      expect(result).toEqual(mockOrder);
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          userId: 1,
          products: {
            create: [
              { productId: 1, quantity: 2 },
              { productId: 2, quantity: 1 },
            ],
          },
        },
        include: { products: true },
      });
    });
  });

  describe('getOrdersByUser', () => {
    it('should return orders with total calculated', async () => {
      const mockOrders = [
        {
          id: 1,
          userId: 1,
          products: [
            {
              quantity: 2,
              product: { id: 1, name: 'Item A', price: 10 },
            },
            {
              quantity: 2,
              product: { id: 2, name: 'Item B', price: 10 },
            },
          ],
          total: 40,
        },
      ];

      mockFindMany.mockResolvedValue(mockOrders);

      const result = await getOrdersByUser(1);

      expect(result).toEqual([
        {
          ...mockOrders[0],
          total: 40,
        },
      ]);

      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId: 1 },
        include: {
          products: {
            include: { product: true },
          },
        },
      });
    });
  });
});
