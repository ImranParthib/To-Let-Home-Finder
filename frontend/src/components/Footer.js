import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-300">
              To Let Home Finder helps you find and list rental properties
              easily.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          © {new Date().getFullYear() } To Let Home Finder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
