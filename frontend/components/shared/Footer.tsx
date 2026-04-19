import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚗</span>
              <span className="text-xl font-bold text-indigo-400">AUTOVERSE</span>
            </div>
            <p className="text-gray-400 text-sm">India&apos;s most trusted verified car marketplace.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/cars" className="hover:text-white transition-colors">Browse Cars</Link></li>
              <li><Link href="/dealers" className="hover:text-white transition-colors">Find Dealers</Link></li>
              <li><Link href="/signup?role=dealer" className="hover:text-white transition-colors">Sell Your Car</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><a href="mailto:support@autoverse.in" className="hover:text-white transition-colors">support@autoverse.in</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 AUTOVERSE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
