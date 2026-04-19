import { randomInt } from 'crypto';

export function generateOTP(): string {
  return randomInt(100000, 1000000).toString();
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function isValidGST(gst: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

export function paginateQuery(page: number, limit: number) {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}
