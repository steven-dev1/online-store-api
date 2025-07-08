import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({ data: { email, password: hashed } });
    res.status(201).json({ message: 'User created' }); // ✅ sin return
  } catch {
    res.status(400).json({ error: 'User already exists' }); // ✅ sin return
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ error: 'Invalid credentials' })
    return;
  };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(400).json({ error: 'Invalid credentials' })
    return;
  };

  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
};
