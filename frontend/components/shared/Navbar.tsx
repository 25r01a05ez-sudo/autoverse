'use client';

import Link from 'next/link';
import { useAuth, useClerk, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🚗</span>
          <span className="text-xl font-bold text-indigo-600">AUTOVERSE</span>
        </Link>
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <Link href="/customer" className="text-gray-600 hover:text-indigo-600 font-medium">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ redirectUrl: '/' })}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-medium transition-colors"
              >
                Logout
              </button>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="redirect">
                <button className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
