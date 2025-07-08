import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  res.json(products);
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
}
