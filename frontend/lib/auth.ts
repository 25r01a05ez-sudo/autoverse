export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'CUSTOMER' | 'DEALER' | 'ADMIN';
  phone?: string;
  avatar?: string;
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user');
  return userData ? (JSON.parse(userData) as User) : null;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function isAuthenticated(): boolean {
  return !!getToken() && !!getUser();
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

export function requireAuth(): void {
  if (!isAuthenticated()) {
    window.location.href = '/login';
  }
}

export function getDashboardPath(role: string): string {
  const paths: Record<string, string> = {
    CUSTOMER: '/customer',
    DEALER: '/dealer',
    ADMIN: '/admin',
  };
  return paths[role] || '/';
}
