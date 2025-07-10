import { prisma } from '../utils/prisma';

export const createOrderForUser = async (userId: number, items: { productId: number, quantity: number }[]) => {
  return prisma.order.create({
    data: {
      userId,
      products: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: { products: true },
  });
};

export const getOrdersByUser = async (userId: number) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};
