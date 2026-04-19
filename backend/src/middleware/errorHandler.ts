import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err.message);

  // Prisma unique constraint error
  if (err.code === 'P2002') {
    res.status(409).json({ error: 'A record with this value already exists' });
    return;
  }

  // Prisma not found error
  if (err.code === 'P2025') {
    res.status(404).json({ error: 'Record not found' });
    return;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
  });
}
