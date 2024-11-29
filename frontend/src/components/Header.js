import React from "react";

export default function Header({ onShowNewListingForm }) {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">To Let Home Finder</h1>
      <button
        onClick={onShowNewListingForm}
        className="mt-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Listing
      </button>
    </header>
  );
}
