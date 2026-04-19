export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString('en-IN')} km`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'] as const;
export const transmissions = ['Manual', 'Automatic', 'CVT', 'DCT'] as const;
export const carStatuses = ['ACTIVE', 'SOLD', 'INACTIVE'] as const;
export const inquiryStatuses = ['PENDING', 'CONTACTED', 'VIEWED', 'REJECTED'] as const;
