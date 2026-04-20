export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'CUSTOMER' | 'DEALER' | 'ADMIN';
  phone?: string;
  avatar?: string;
}

export function getDashboardPath(role: string): string {
  const paths: Record<string, string> = {
    CUSTOMER: '/customer',
    DEALER: '/dealer',
    ADMIN: '/admin',
  };
  return paths[role] || '/';
}
