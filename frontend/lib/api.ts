const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),

  auth: {
    login: (email: string, password: string) =>
      api.post('/auth/login', { email, password }),
    register: (data: Record<string, unknown>) =>
      api.post('/auth/register', data),
    me: () => api.get('/auth/me'),
  },

  cars: {
    list: (params?: Record<string, string>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/cars${query}`);
    },
    get: (id: string) => api.get(`/cars/${id}`),
    create: (data: Record<string, unknown>) => api.post('/cars', data),
    update: (id: string, data: Record<string, unknown>) => api.put(`/cars/${id}`, data),
    delete: (id: string) => api.delete(`/cars/${id}`),
  },

  dealers: {
    list: () => api.get('/dealers'),
    get: (id: string) => api.get(`/dealers/${id}`),
  },

  inquiries: {
    list: () => api.get('/inquiries'),
    create: (data: Record<string, unknown>) => api.post('/inquiries', data),
    update: (id: string, status: string) => api.put(`/inquiries/${id}`, { status }),
  },
};

export default api;
