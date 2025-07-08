import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createOrder, getMyOrders } from '../controllers/order.controller';

const router = Router();

router.use(authenticate);
router.post('/', createOrder);
router.get('/', getMyOrders);

export default router;
