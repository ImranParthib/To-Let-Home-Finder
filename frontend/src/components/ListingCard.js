import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ListingCard({ listing, isAdmin, onUpdate, onDelete }) {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleUpdate = () => {
    // In a real app, you'd open a form to edit the listing
    const updatedListing = { ...listing, title: `${listing.title}  ` };
    onUpdate(updatedListing);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      onDelete(listing.id);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend
    alert("Message sent to landlord!");
    setShowContactForm(false);
  };

  console.log(listing);

  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow">
      <h3 className=" text-slate-900 font-bold text-lg mb-2">
        {listing.title}
      </h3>
      <p className="text-gray-600 mb-2">Location: {listing.location}</p>
      <p className="text-green-600 font-semibold mb-2">
        Price: ${listing.price}/month
      </p>
      <p className="text-sm text-gray-500 mb-2">
        {listing.propertyType} | {listing.bedrooms} bed | {listing.bathrooms}{" "}
        bath
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {listing.images.slice(0, 2).map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Listing image ${index + 1}`}
            width={150}
            height={150}
            className="object-cover w-full h-32 rounded"
          />
        ))}
      </div>
      <Link
        href={`/property/${listing.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-2 block text-center"
      >
        View Details
      </Link>
      <button
        onClick={() => setShowContactForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-2"
      >
        Contact Now
      </button>
      {showContactForm && (
        <form onSubmit={handleContactSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded p-2 mb-2"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded p-2 mb-2"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full border rounded p-2 mb-2"
            rows="3"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Send Message
          </button>
        </form>
      )}
      {isAdmin && (
        <div className="flex justify-between mt-2">
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
