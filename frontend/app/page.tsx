import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚗</span>
            <h1 className="text-2xl font-bold text-indigo-600">AUTOVERSE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          🎉 Verified Car Marketplace in India
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Find Your Perfect
          <span className="text-indigo-600"> Verified Car</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Browse verified cars from trusted, GST-registered dealers. No fraud, no middlemen — just honest deals and transparent pricing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 font-semibold text-lg transition-colors shadow-lg shadow-indigo-200"
          >
            Browse Cars →
          </Link>
          <Link
            href="/signup?role=dealer"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 font-semibold text-lg transition-colors"
          >
            List Your Cars
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Verified Cars</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-indigo-200">Trusted Dealers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-indigo-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-indigo-200">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AUTOVERSE?</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We make buying and selling used cars safe, transparent, and hassle-free.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Verified Dealers</h4>
              <p className="text-gray-600">All dealers are verified with GST number, business registration, and physical address verification.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Verified Cars</h4>
              <p className="text-gray-600">Every car listing is checked for authentic registration, accident history, and proper documentation.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">💬</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Direct Contact</h4>
              <p className="text-gray-600">Connect directly with dealers. No middlemen, no commissions, just honest and transparent transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Dream Car?</h3>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of buyers and trusted dealers on India&apos;s most transparent car marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 font-semibold text-lg transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              href="/signup?role=dealer"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-100 font-semibold text-lg transition-colors"
            >
              Register as Dealer
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl">🚗</span>
              <span className="text-xl font-bold text-indigo-600">AUTOVERSE</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 AUTOVERSE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
