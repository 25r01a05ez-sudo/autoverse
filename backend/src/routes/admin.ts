import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// All admin routes require ADMIN role
router.use(authenticate, authorize('ADMIN'));

// GET /api/admin/stats
router.get('/stats', async (_req: AuthRequest, res, next) => {
  try {
    const [users, dealers, cars, inquiries, pendingVerifications] = await Promise.all([
      prisma.user.count(),
      prisma.dealer.count(),
      prisma.car.count(),
      prisma.inquiry.count(),
      prisma.dealer.count({ where: { verificationStatus: 'pending' } }),
    ]);

    res.json({ users, dealers, cars, inquiries, pendingVerifications });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/dealers
router.get('/dealers', async (_req: AuthRequest, res, next) => {
  try {
    const dealers = await prisma.dealer.findMany({
      include: {
        user: { select: { email: true, fullName: true } },
        _count: { select: { cars: true, inquiries: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ dealers });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/dealers/:id/verify
router.put('/dealers/:id/verify', async (req: AuthRequest, res, next) => {
  try {
    const { status } = req.body;

    const dealer = await prisma.dealer.update({
      where: { id: req.params.id },
      data: {
        verificationStatus: status,
        isVerified: status === 'approved',
      },
    });

    res.json({ message: 'Dealer verification updated', dealer });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/users
router.get('/users', async (_req: AuthRequest, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        dealer: { select: { shopName: true, isVerified: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

export default router;
