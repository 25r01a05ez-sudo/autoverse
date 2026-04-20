const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

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
  get: <T>(path: string, token?: string | null) => request<T>('GET', path, undefined, token),
  post: <T>(path: string, body: unknown, token?: string | null) => request<T>('POST', path, body, token),
  put: <T>(path: string, body: unknown, token?: string | null) => request<T>('PUT', path, body, token),
  delete: <T>(path: string, token?: string | null) => request<T>('DELETE', path, undefined, token),

  cars: {
    list: (params?: Record<string, string>, token?: string | null) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/cars${query}`, token);
    },
    get: (id: string, token?: string | null) => api.get(`/cars/${id}`, token),
    create: (data: Record<string, unknown>, token?: string | null) => api.post('/cars', data, token),
    update: (id: string, data: Record<string, unknown>, token?: string | null) => api.put(`/cars/${id}`, data, token),
    delete: (id: string, token?: string | null) => api.delete(`/cars/${id}`, token),
  },

  dealers: {
    list: (token?: string | null) => api.get('/dealers', token),
    get: (id: string, token?: string | null) => api.get(`/dealers/${id}`, token),
  },

  inquiries: {
    list: (token?: string | null) => api.get('/inquiries', token),
    create: (data: Record<string, unknown>, token?: string | null) => api.post('/inquiries', data, token),
    update: (id: string, status: string, token?: string | null) => api.put(`/inquiries/${id}`, { status }, token),
  },
};

export default api;
