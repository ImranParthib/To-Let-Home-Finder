import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ListingCard({ listing, onDelete }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % (listing.images?.length || 1));
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? (listing.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/listings/${listing._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        onDelete(listing._id);
      } else {
        console.error("Failed to delete listing:", data.message);
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  // Delete Confirmation Modal (same as previous implementation)
  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ease-in-out">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Are You Sure?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          You are about to delete this listing. This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete();
              setIsDeleteModalOpen(false);
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  // Image Gallery Modal
  const ImageGalleryModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={() => setIsGalleryOpen(false)}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={`http://localhost:5000/images/${listing.images[currentImageIndex]}`}
            alt={`Listing image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        {/* Navigation Buttons */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/30 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {listing.images.length}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setIsGalleryOpen(false)}
          className="absolute top-4 right-4 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isDeleteModalOpen && <DeleteConfirmationModal />}
      {isGalleryOpen && <ImageGalleryModal />}

      <div className="group bg-white border-2 border-blue-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div
          className="relative h-56 overflow-hidden cursor-pointer"
          onClick={() => listing.images?.length > 0 && setIsGalleryOpen(true)}
        >
          {listing.images?.length > 0 ? (
            <Image
              src={`http://localhost:5000/images/${listing.images[0]}`}
              alt="Listing primary image"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}

          {/* Multiple Images Indicator */}
          {listing.images?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              +{listing.images.length - 1} more
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-slate-900 flex-grow">
              {listing.title}
            </h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              ${listing.price}/month
            </span>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {listing.location}
          </div>

          <div className="flex justify-between items-center text-gray-600 mb-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V9a2 2 0 012-2h.5a5.98 5.98 0 011.954-3.908A5.981 5.98 0 0112 2c1.777 0 3.374.776 4.546 2.092A5.98 5.98 0 0118.5 7H19a2 2 0 012 2v8a4 4 0 01-4 4H7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"
                />
              </svg>
              {listing.bedrooms} bed | {listing.bathrooms} bath
            </div>
          </div>

          <div className="flex space-x-3">
            <Link href={`/property/${listing._id}`} legacyBehavior>
              <a className="flex-grow bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center">
                View Details
              </a>
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
