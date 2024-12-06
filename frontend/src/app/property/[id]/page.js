'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the listing ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const response = await fetch(`http://localhost:5000/listings/${id}`);
          const data = await response.json();
          if (data.status === "ok") {
            setProperty(data.data);
          } else {
            setError("Listing not found");
          }
        } catch (error) {
          console.error("Error fetching listing:", error);
          setError("Failed to fetch listing details");
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">&larr; Back to listings</Link>
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {property.images.map((image, index) => (
          <Image
            key={index}
            src={`http://localhost:5000/images/${image}`}
            alt={`Property image ${index + 1}`}
            width={500}
            height={300}
            className="object-cover w-full h-64 rounded"
          />
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-xl font-semibold text-green-600 mb-2">Price: ${property.price}/month</p>
        <p className="mb-2">Location: {property.location}</p>
        <p className="mb-2">{property.bedrooms} bed | {property.bathrooms} bath</p>
        <p className="mb-2">Amenities: {property.amenities.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p>{property.description}</p>
      </div>
    </div>
  );
}