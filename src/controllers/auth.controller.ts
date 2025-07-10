import { Request, RequestHandler, Response } from 'express';
import { createUser, findUserByEmail, validatePassword } from '../services/auth.service';
import { generateToken } from '../utils/jwt';

export const register: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await createUser(email, password);
    res.status(201).json({ message: 'User created' });
    return;
  } catch {
    res.status(400).json({ error: 'User already exists' });
    return;
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: 'Invalid credentials' })
    return;
  };

  const valid = await validatePassword(password, user.password);
  if (!valid) {
    res.status(400).json({ error: 'Invalid credentials' })
    return;
  };

  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
};

