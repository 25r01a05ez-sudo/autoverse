import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/cars
router.get('/', async (req, res, next) => {
  try {
    const { brand, fuelType, minPrice, maxPrice, city, page = '1', limit = '12' } = req.query;

    const where: Record<string, unknown> = { status: 'ACTIVE' };

    if (brand) where.brand = { contains: brand as string, mode: 'insensitive' };
    if (fuelType) where.fuelType = fuelType as string;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) (where.price as Record<string, unknown>).gte = parseFloat(minPrice as string);
      if (maxPrice) (where.price as Record<string, unknown>).lte = parseFloat(maxPrice as string);
    }
    if (city) {
      where.dealer = { city: { contains: city as string, mode: 'insensitive' } };
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        include: {
          dealer: {
            select: { shopName: true, city: true, state: true, isVerified: true },
          },
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.car.count({ where }),
    ]);

    res.json({
      cars,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res, next) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id: req.params.id },
      include: {
        dealer: {
          select: {
            id: true,
            shopName: true,
            city: true,
            state: true,
            shopAddress: true,
            phone: true,
            email: true,
            isVerified: true,
          },
        },
      },
    });

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    res.json({ car });
  } catch (err) {
    next(err);
  }
});

// POST /api/cars (dealer only)
router.post('/', authenticate, authorize('DEALER'), async (req: AuthRequest, res, next) => {
  try {
    const dealer = await prisma.dealer.findUnique({
      where: { userId: req.user!.id },
    });

    if (!dealer) {
      res.status(404).json({ error: 'Dealer profile not found' });
      return;
    }

    const {
      title, description, price, brand, model, year,
      mileage, fuelType, transmission, registrationNumber, photos,
    } = req.body;

    if (!title || !price || !brand || !model || !year || !registrationNumber) {
      res.status(400).json({ error: 'Required fields missing' });
      return;
    }

    const car = await prisma.car.create({
      data: {
        dealerId: dealer.id,
        title,
        description,
        price: parseFloat(price),
        brand,
        model,
        year: parseInt(year),
        mileage: parseInt(mileage) || 0,
        fuelType,
        transmission,
        registrationNumber,
        photos,
      },
    });

    res.status(201).json({ message: 'Car listed successfully', car });
  } catch (err) {
    next(err);
  }
});

// PUT /api/cars/:id (dealer only)
router.put('/:id', authenticate, authorize('DEALER'), async (req: AuthRequest, res, next) => {
  try {
    const dealer = await prisma.dealer.findUnique({
      where: { userId: req.user!.id },
    });

    const car = await prisma.car.findFirst({
      where: { id: req.params.id, dealerId: dealer?.id },
    });

    if (!car) {
      res.status(404).json({ error: 'Car not found or unauthorized' });
      return;
    }

    const updated = await prisma.car.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ message: 'Car updated', car: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cars/:id (dealer or admin)
router.delete('/:id', authenticate, authorize('DEALER', 'ADMIN'), async (req: AuthRequest, res, next) => {
  try {
    await prisma.car.delete({ where: { id: req.params.id } });
    res.json({ message: 'Car deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
