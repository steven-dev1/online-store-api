import { mockCreate, mockFindMany, mockFindUnique } from '../../__mocks__/prisma';
import {
  getAllProducts,
  getProductById,
  createProduct,
} from '../../services/product.service';

jest.mock('../../utils/prisma', () => ({
  prisma: {
    product: {
      findMany: mockFindMany,
      findUnique: mockFindUnique,
      create: mockCreate,
    },
  },
}));

describe('product.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    const mockProducts = [
      { id: 1, name: 'A', price: 10, description: 'desc' },
      { id: 2, name: 'B', price: 20, description: 'desc' },
    ];

    mockFindMany.mockResolvedValue(mockProducts);

    const result = await getAllProducts();

    expect(result).toEqual(mockProducts);
    expect(mockFindMany).toHaveBeenCalled();
  });

  it('should return a product by id', async () => {
    const mockProduct = { id: 1, name: 'Test', price: 10, description: 'X' };

    mockFindUnique.mockResolvedValue(mockProduct);

    const result = await getProductById("1");

    expect(result).toEqual(mockProduct);
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a product', async () => {
    const mockProduct = { id: 1, name: 'Test', price: 10, description: 'Nice' };

    mockCreate.mockResolvedValue(mockProduct);

    const result = await createProduct('Test', 10, 'Nice');

    expect(result).toEqual(mockProduct);
    expect(mockCreate).toHaveBeenCalledWith({
      data: { name: 'Test', price: 10, description: 'Nice' },
    });
  });
});
