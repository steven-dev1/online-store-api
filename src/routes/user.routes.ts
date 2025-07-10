import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getMe } from '../controllers/user.controller';

const router = Router();
router.use(authenticate);
router.get('/', getMe);

export default router;

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get authenticated user info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
