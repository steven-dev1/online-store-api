import { Request, RequestHandler, Response } from 'express';
import { createOrderForUser, getOrdersByUser } from '../services/order.service';

export const createOrder: RequestHandler = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const items = req.body.items;

  if (!Array.isArray(items)) {
    res.status(400).json({ error: 'Items must be an array' });
    return;
  }

  const order = await createOrderForUser(userId, items);
  res.status(201).json(order);
};

export const getMyOrders = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const orders = await getOrdersByUser(userId);

  const ordersWithTotal = orders.map(order => {
    const total = order.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return { ...order, total };
  });

  res.json(ordersWithTotal);
};
