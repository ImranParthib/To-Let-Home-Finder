"use client";
import { useState, useEffect } from "react";
import NewListingForm from "../components/NewListingForm";
import ListingCard from "../components/ListingCard";
import SearchForm from "../components/SearchForm";
import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [showNewListingForm, setShowNewListingForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Fetch listings
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

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    setShowNewListingForm(false);
  };

  const handleSearch = (searchCriteria) => {
    let filtered = [...listings];

    if (searchCriteria.query) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchCriteria.query.toLowerCase())
      );
    }

    if (searchCriteria.location) {
      filtered = filtered.filter(listing =>
        listing.location.toLowerCase().includes(searchCriteria.location.toLowerCase())
      );
    }

    if (searchCriteria.minPrice) {
      filtered = filtered.filter(listing =>
        listing.price >= parseInt(searchCriteria.minPrice)
      );
    }
    if (searchCriteria.maxPrice) {
      filtered = filtered.filter(listing =>
        listing.price <= parseInt(searchCriteria.maxPrice)
      );
    }

    setFilteredListings(filtered);
  };

  const handleNewListing = (newListing) => {
    setListings((prevListings) => [...prevListings, newListing]);
    setFilteredListings((prevListings) => [...prevListings, newListing]);
    setShowNewListingForm(false);
  };

  const handleDeleteListing = (listingId) => {
    setListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
    setFilteredListings((prevListings) => prevListings.filter(listing => listing._id !== listingId));
  };

  const handleShowNewListing = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowNewListingForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        isAuthenticated={isAuthenticated}
        onShowNewListingForm={handleShowNewListing}
        onShowAuth={() => setShowAuthModal(true)}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-grow container mx-auto p-8">
        {showNewListingForm && isAuthenticated && (
          <NewListingForm 
            onSubmit={handleNewListing} 
            isAuthenticated={isAuthenticated}
            onShowAuth={() => setShowAuthModal(true)}
          />
        )}

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        )}

        <SearchForm onSearch={handleSearch} />

        <section className="listings-section">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Homes
          </h2>
          {filteredListings.length === 0 ? (
            <p className="text-center text-gray-500">No listings found matching your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  onDelete={handleDeleteListing}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
