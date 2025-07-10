import { prisma } from '../utils/prisma';

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({ where: { id: parseInt(id) } });
};

export const createProduct = async (name: string, price: number, description: string) => {
  return prisma.product.create({
    data: { name, price, description },
  });
};