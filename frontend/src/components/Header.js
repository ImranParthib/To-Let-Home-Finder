import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header({
  isAuthenticated,
  user,
  isAdmin,
  onLogout,
  onShowNewListingForm,
  onShowAuthModal,
}) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/to-let-icon.png"
            alt="To Let Icon"
            width={50}
            height={50}
            className="rounded-full p-1 bg-teal-400 shadow-md"
          />
          <h1 className="text-3xl font-bold font-lobster">
            <span className="text-yellow-400">To</span>
            <span className="text-white"> Let</span>
          </h1>
        </motion.div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="hover:text-yellow-300 transition-colors text-lg"
              >
                Home
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/search"
                className="hover:text-yellow-300 transition-colors text-lg"
              >
                Search
              </Link>
            </motion.li>
            {isAuthenticated && (
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={onShowNewListingForm}
                  className="hover:text-yellow-300 transition-colors text-lg"
                >
                  Post a Listing
                </button>
              </motion.li>
            )}
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="hover:text-yellow-300 transition-colors text-lg"
              >
                About
              </Link>
            </motion.li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-lg">
                Welcome, {user.name}
              </span>
              <motion.button
                onClick={onLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded-full hover:bg-yellow-300 hover:text-blue-800 transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={onShowAuthModal}
              className="bg-yellow-300 text-blue-800 px-4 py-1 rounded-full hover:bg-white hover:text-blue-600 transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login/Register
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
