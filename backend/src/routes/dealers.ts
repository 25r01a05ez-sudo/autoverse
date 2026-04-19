import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/dealers
router.get('/', async (req, res, next) => {
  try {
    const { city, state } = req.query;

    const where: Record<string, unknown> = { isVerified: true };
    if (city) where.city = { contains: city as string, mode: 'insensitive' };
    if (state) where.state = { contains: state as string, mode: 'insensitive' };

    const dealers = await prisma.dealer.findMany({
      where,
      select: {
        id: true,
        shopName: true,
        shopAddress: true,
        city: true,
        state: true,
        phone: true,
        email: true,
        isVerified: true,
        shopLatitude: true,
        shopLongitude: true,
        _count: { select: { cars: true } },
      },
      orderBy: { shopName: 'asc' },
    });

    res.json({ dealers });
  } catch (err) {
    next(err);
  }
});

// GET /api/dealers/:id
router.get('/:id', async (req, res, next) => {
  try {
    const dealer = await prisma.dealer.findUnique({
      where: { id: req.params.id },
      include: {
        cars: {
          where: { status: 'ACTIVE' },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { cars: true, inquiries: true } },
      },
    });

    if (!dealer) {
      res.status(404).json({ error: 'Dealer not found' });
      return;
    }

    res.json({ dealer });
  } catch (err) {
    next(err);
  }
});

export default router;
