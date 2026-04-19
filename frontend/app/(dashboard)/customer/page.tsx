'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  fullName: string;
  email: string;
  role: string;
}

export default function CustomerDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    else window.location.href = '/login';
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
            <span className="text-gray-600 text-sm">Hello, {user.fullName}</span>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Customer Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-1">My Inquiries</h3>
            <p className="text-2xl font-bold text-indigo-600">0</p>
            <p className="text-sm text-gray-500 mt-1">Total inquiries sent</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Saved Cars</h3>
            <p className="text-2xl font-bold text-indigo-600">0</p>
            <p className="text-sm text-gray-500 mt-1">Cars in wishlist</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">👁️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Recently Viewed</h3>
            <p className="text-2xl font-bold text-indigo-600">0</p>
            <p className="text-sm text-gray-500 mt-1">Cars viewed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/cars"
              className="flex flex-col items-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors text-center"
            >
              <span className="text-2xl mb-2">🚗</span>
              <span className="text-sm font-medium text-indigo-700">Browse Cars</span>
            </Link>
            <Link
              href="/dealers"
              className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center"
            >
              <span className="text-2xl mb-2">🏪</span>
              <span className="text-sm font-medium text-green-700">Find Dealers</span>
            </Link>
            <Link
              href="/inquiries"
              className="flex flex-col items-center p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors text-center"
            >
              <span className="text-2xl mb-2">📋</span>
              <span className="text-sm font-medium text-yellow-700">My Inquiries</span>
            </Link>
            <Link
              href="/profile"
              className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center"
            >
              <span className="text-2xl mb-2">👤</span>
              <span className="text-sm font-medium text-purple-700">My Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
