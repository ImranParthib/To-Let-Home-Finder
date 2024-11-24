"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewListingForm from "../components/NewListingForm";
import SearchForm from "../components/SearchForm";
import ListingCard from "../components/ListingCard";
import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Function to generate sample listings
const generateSampleListings = (count) => {
  const sampleListings = [];
  for (let i = 1; i <= count; i++) {
    sampleListings.push({
      id: i,
      title: `Sample Home ${i}`,
      location: `City ${i}`,
      price: Math.floor(Math.random() * 1000) + 500,
      description: `This is a sample description for home ${i}.`,
      propertyType: ["apartment", "house", "studio"][
        Math.floor(Math.random() * 3)
      ],
      bedrooms: Math.floor(Math.random() * 3) + 1,
      bathrooms: Math.floor(Math.random() * 2) + 1,
      images: ["/sample-home-image.jpg", "/sample-home-image-2.jpg"],
      amenities: ["Parking", "Wifi", "Gym", "Pool"].slice(
        0,
        Math.floor(Math.random() * 4) + 1
      ),
    });
  }
  return sampleListings;
};

export default function Home() {
  const [showNewListingForm, setShowNewListingForm] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch listings from API or use sample data
    const fetchListings = async () => {
      // In a real app, you would fetch from an API
      // For now, we'll use localStorage or generate sample data
      const storedListings = JSON.parse(
        localStorage.getItem("listings") || "[]"
      );
      if (storedListings.length === 0) {
        const sampleData = generateSampleListings(12);
        setListings(sampleData);
        setFilteredListings(sampleData);
        localStorage.setItem("listings", JSON.stringify(sampleData));
      } else {
        setListings(storedListings);
        setFilteredListings(storedListings);
      }
    };
    fetchListings();

    // Check user authentication status
    const token = localStorage.getItem("authToken");
    if (token) {
      // Validate token with backend
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    // Check if user is admin
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleNewListing = (formData) => {
    // In a real app, you would upload images to a server and get URLs back
    // For this example, we'll use a placeholder image URL
    const placeholderImageUrl = "/sample-home-image.jpg";

    const newListing = {
      id: Date.now(),
      ...formData,
      landlordId: user.id,
      images:
        formData.images.length > 0
          ? [placeholderImageUrl, placeholderImageUrl]
          : [placeholderImageUrl],
    };
    const updatedListings = [...listings, newListing];
    setListings(updatedListings);
    setFilteredListings(updatedListings);
    localStorage.setItem("listings", JSON.stringify(updatedListings));
    setShowNewListingForm(false);
  };

  const handleSearch = (searchCriteria) => {
    const filtered = listings.filter(
      (listing) =>
        listing.location
          .toLowerCase()
          .includes(searchCriteria.location.toLowerCase()) &&
        (searchCriteria.maxPrice
          ? listing.price <= searchCriteria.maxPrice
          : true) &&
        (searchCriteria.propertyType
          ? listing.propertyType === searchCriteria.propertyType
          : true) &&
        (searchCriteria.bedrooms
          ? listing.bedrooms >= searchCriteria.bedrooms
          : true)
    );
    setFilteredListings(filtered);
  };

  const handleLogin = (userData) => {
    // In a real app, validate credentials with backend
    setIsAuthenticated(true);
    setUser(userData);
    setIsAdmin(userData.isAdmin);
    localStorage.setItem("authToken", "dummy-token");
    localStorage.setItem("user", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const handleUpdateListing = (updatedListing) => {
    const updatedListings = listings.map((listing) =>
      listing.id === updatedListing.id ? updatedListing : listing
    );
    setListings(updatedListings);
    setFilteredListings(updatedListings);
    localStorage.setItem("listings", JSON.stringify(updatedListings));
  };

  const handleDeleteListing = (listingId) => {
    const updatedListings = listings.filter(
      (listing) => listing.id !== listingId
    );
    setListings(updatedListings);
    setFilteredListings(updatedListings);
    localStorage.setItem("listings", JSON.stringify(updatedListings));
  };

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onShowNewListingForm={() => setShowNewListingForm(true)}
        onShowAuthModal={() => setShowAuthModal(true)}
      />

      <main className="flex-grow container mx-auto p-8">
        <motion.section
          className="search-section mb-12 bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Find Your Perfect Home
          </h2>
          <SearchForm onSearch={handleSearch} />
        </motion.section>

        {showNewListingForm && (
          <motion.section
            className="post-section mb-12 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Post a New Listing
            </h2>
            <NewListingForm onSubmit={handleNewListing} />
          </motion.section>
        )}

        <section className="listings-section">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Homes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ListingCard
                  listing={listing}
                  isAdmin={isAdmin}
                  onUpdate={handleUpdateListing}
                  onDelete={handleDeleteListing}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
