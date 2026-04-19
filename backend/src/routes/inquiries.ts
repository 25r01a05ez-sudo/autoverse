import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/inquiries (get user's inquiries)
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!;
    let inquiries;

    if (user.role === 'CUSTOMER') {
      inquiries = await prisma.inquiry.findMany({
        where: { customerId: user.id },
        include: {
          car: { select: { title: true, brand: true, model: true, price: true } },
          dealer: { select: { shopName: true, city: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (user.role === 'DEALER') {
      const dealer = await prisma.dealer.findUnique({ where: { userId: user.id } });
      inquiries = await prisma.inquiry.findMany({
        where: { dealerId: dealer?.id },
        include: {
          car: { select: { title: true, brand: true, model: true } },
          customer: { select: { fullName: true, phone: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      inquiries = await prisma.inquiry.findMany({
        include: {
          car: { select: { title: true, brand: true, model: true } },
          customer: { select: { fullName: true, email: true } },
          dealer: { select: { shopName: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    res.json({ inquiries });
  } catch (err) {
    next(err);
  }
});

// POST /api/inquiries
router.post('/', authenticate, authorize('CUSTOMER'), async (req: AuthRequest, res, next) => {
  try {
    const { carId, message, phone, email } = req.body;

    if (!carId || !phone || !email) {
      res.status(400).json({ error: 'Car ID, phone, and email are required' });
      return;
    }

    const car = await prisma.car.findUnique({
      where: { id: carId },
      select: { dealerId: true },
    });

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        customerId: req.user!.id,
        carId,
        dealerId: car.dealerId,
        message,
        phone,
        email,
      },
    });

    res.status(201).json({ message: 'Inquiry sent successfully', inquiry });
  } catch (err) {
    next(err);
  }
});

// PUT /api/inquiries/:id
router.put('/:id', authenticate, authorize('DEALER', 'ADMIN'), async (req: AuthRequest, res, next) => {
  try {
    const { status } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json({ message: 'Inquiry updated', inquiry });
  } catch (err) {
    next(err);
  }
});

export default router;
