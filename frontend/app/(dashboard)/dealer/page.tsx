'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  fullName: string;
  email: string;
  role: string;
}

export default function DealerDashboard() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dealer Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your car listings and inquiries</p>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Cars</h3>
            <p className="text-2xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-semibold text-gray-900 mb-1">Active Listings</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">📩</div>
            <h3 className="font-semibold text-gray-900 mb-1">New Inquiries</h3>
            <p className="text-2xl font-bold text-yellow-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-1">Cars Sold</h3>
            <p className="text-2xl font-bold text-purple-600">0</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/dealer/cars/add"
                className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <span className="text-xl">➕</span>
                <span className="font-medium text-indigo-700">Add New Car</span>
              </Link>
              <Link
                href="/dealer/cars"
                className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-xl">🚗</span>
                <span className="font-medium text-green-700">View My Cars</span>
              </Link>
              <Link
                href="/dealer/inquiries"
                className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <span className="text-xl">📋</span>
                <span className="font-medium text-yellow-700">View Inquiries</span>
              </Link>
              <Link
                href="/dealer/profile"
                className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-xl">🏪</span>
                <span className="font-medium text-purple-700">Edit Shop Profile</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Inquiries</h2>
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📭</div>
              <p>No inquiries yet</p>
              <p className="text-sm mt-1">Add cars to start receiving inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
