import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <Link href="/" className="text-3xl font-bold text-indigo-600">🚗 AUTOVERSE</Link>
        <p className="mt-2 text-gray-600">Sign in to access your account</p>
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-sm rounded-2xl border border-gray-100',
            headerTitle: 'text-2xl font-bold text-gray-900',
            headerSubtitle: 'text-gray-600',
            formButtonPrimary:
              'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors',
            formFieldInput:
              'border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none',
            footerActionLink: 'text-indigo-600 hover:text-indigo-700 font-medium',
          },
        }}
      />
    </div>
  );
}
