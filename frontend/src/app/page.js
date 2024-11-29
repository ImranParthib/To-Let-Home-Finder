"use client";
import { useState, useEffect } from "react";
import NewListingForm from "../components/NewListingForm";
import ListingCard from "../components/ListingCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [showNewListingForm, setShowNewListingForm] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/listings");
        const data = await response.json();
        if (data.status === "ok") {
          setListings(data.data);
          setFilteredListings(data.data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  const handleNewListing = (newListing) => {
    setListings((prevListings) => [...prevListings, newListing]);
    setFilteredListings((prevListings) => [...prevListings, newListing]);
    setShowNewListingForm(false);
  };

  const handleDeleteListing = (listingId) => {
    setListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
    setFilteredListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        onShowNewListingForm={() => setShowNewListingForm(true)}
      />

      <main className="flex-grow container mx-auto p-8">
        {showNewListingForm && (
          <NewListingForm onSubmit={handleNewListing} />
        )}

        <section className="listings-section">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Homes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                onDelete={handleDeleteListing}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
