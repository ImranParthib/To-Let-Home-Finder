import React from "react";
import Link from "next/link";

export default function Header({ onShowNewListingForm, isAuthenticated, onShowAuth, user, onLogout }) {
  const handleAddNewListing = () => {
    if (!isAuthenticated) {
      onShowAuth();
    } else {
      onShowNewListingForm();
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 relative">
        {/* Logo with hover effect */}
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-200 transition-all duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10l9-7 9 7M4 10h16v11H4V10z" />
            </svg>
            To Let Home Finder
          </a>
        </Link>

        {/* Navigation with advanced styling */}
        <nav className="flex items-center space-x-4">
          {/* Add New Listing Button */}
          <button
            onClick={handleAddNewListing}
            className="group relative px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Listing
          </button>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-900/30 px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-100">
                  {user?.username}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="group relative px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onShowAuth}
              className="group relative px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Login / Register
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}