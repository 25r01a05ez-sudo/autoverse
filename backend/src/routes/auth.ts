import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

function createToken(payload: object): string {
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = { expiresIn: 7 * 24 * 60 * 60 }; // 7 days in seconds
  return jwt.sign(payload, secret, options);
}

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, fullName, phone, role, gstNumber, shopName, shopAddress, city, state } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userRole = role === 'DEALER' ? 'DEALER' : 'CUSTOMER';

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        role: userRole,
      },
    });

    if (userRole === 'DEALER') {
      if (!gstNumber || !shopName || !shopAddress || !city || !state) {
        await prisma.user.delete({ where: { id: user.id } });
        res.status(400).json({ error: 'Dealer details are required' });
        return;
      }
      await prisma.dealer.create({
        data: {
          userId: user.id,
          gstNumber,
          shopName,
          shopAddress,
          city,
          state,
          phone: phone || '',
          email,
        },
      });
    }

    const token = createToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = createToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        avatar: true,
        createdAt: true,
        dealer: {
          select: {
            id: true,
            shopName: true,
            city: true,
            isVerified: true,
            verificationStatus: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
