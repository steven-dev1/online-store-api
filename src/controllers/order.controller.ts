import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createOrder(req: Request, res: Response) {
  const userId = (req.user as any).id;
  const { products } = req.body; // [{ productId, quantity }]

  const order = await prisma.order.create({
    data: {
      userId,
      products: {
        create: products.map((p: any) => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
      },
    },
    include: { products: true },
  });

  res.status(201).json(order);
}

export async function getMyOrders(req: Request, res: Response) {
  const userId = (req.user as any).id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  const ordersWithTotal = orders.map(order => {
    const total = order.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { ...order, total };
  });

  res.json(ordersWithTotal);
}
