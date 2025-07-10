import { Request, RequestHandler, Response } from 'express';
import { getAllProducts, getProductById } from '../services/product.service';

export const getProducts = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.json(products);
};

export const getProduct: RequestHandler = async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return;
  };
  res.json(product);
};