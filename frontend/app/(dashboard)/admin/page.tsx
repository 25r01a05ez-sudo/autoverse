'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  fullName: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const u = JSON.parse(userData);
      if (u.role !== 'ADMIN') {
        window.location.href = '/login';
        return;
      }
      setUser(u);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">🚗 AUTOVERSE</Link>
          <div className="flex items-center gap-4">
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">ADMIN</span>
            <span className="text-gray-600 text-sm">{user.fullName}</span>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Platform management and oversight</p>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Users</h3>
            <p className="text-2xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">🏪</div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Dealers</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Cars</h3>
            <p className="text-2xl font-bold text-yellow-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">⏳</div>
            <h3 className="font-semibold text-gray-900 mb-1">Pending Verifications</h3>
            <p className="text-2xl font-bold text-red-600">0</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Admin Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/dealers"
                className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <span className="text-xl">🏪</span>
                <span className="font-medium text-indigo-700">Manage Dealers</span>
              </Link>
              <Link
                href="/admin/cars"
                className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-xl">🚗</span>
                <span className="font-medium text-green-700">Manage Cars</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <span className="text-xl">👥</span>
                <span className="font-medium text-yellow-700">Manage Users</span>
              </Link>
              <Link
                href="/admin/verifications"
                className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span className="text-xl">✅</span>
                <span className="font-medium text-red-700">Dealer Verifications</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Platform Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Active dealers</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Cars listed today</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Inquiries today</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">New registrations</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
