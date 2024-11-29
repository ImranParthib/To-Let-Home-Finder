import Image from "next/image";
import Link from "next/link";

export default function ListingCard({ listing, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await fetch(`http://localhost:5000/listings/${listing._id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.status === "ok") {
          onDelete(listing._id);
        } else {
          console.error("Failed to delete listing:", data.message);
        }
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-slate-900 font-bold text-lg mb-2">{listing.title}</h3>
      <p className="text-gray-600 mb-2">Location: {listing.location}</p>
      <p className="text-green-600 font-semibold mb-2">Price: ${listing.price}/month</p>
      <p className="text-sm text-gray-500 mb-2">
        {listing.bedrooms} bed | {listing.bathrooms} bath
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {listing.images?.map((image, index) => (
          <Image
            key={index}
            src={`http://localhost:5000/images/${image}`}
            alt={`Listing image ${index + 1}`}
            width={150}
            height={150}
            className="object-cover w-full h-32 rounded"
          />
        )) || <p>No images available</p>}
      </div>
      <Link href={`/property/${listing._id}`} legacyBehavior>
        <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-2 block text-center">
          View Details
        </a>
      </Link>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mb-2"
      >
        Delete
      </button>
    </div>
  );
}