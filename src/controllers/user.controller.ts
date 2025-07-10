import { RequestHandler } from 'express';
import { getUserById } from '../services/user.service';

export const getMe: RequestHandler = async (req, res) => {
  const userId = (req.user as any).id;

  const user = await getUserById(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return;
  };

  res.json(user);
};
