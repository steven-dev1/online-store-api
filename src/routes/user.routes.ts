import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getMe } from '../controllers/user.controller';

const router = Router();
router.use(authenticate);
router.get('/', getMe);

export default router;
