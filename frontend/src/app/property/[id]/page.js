'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertyDetails({ params }) {
  const [property, setProperty] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    // In a real app, fetch the property details from an API
    const fetchProperty = () => {
      const listings = JSON.parse(localStorage.getItem('listings') || '[]');
      const foundProperty = listings.find(listing => listing.id === parseInt(params.id));
      setProperty(foundProperty);
    };
    fetchProperty();
  }, [params.id]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend
    alert('Message sent to landlord!');
    setShowContactForm(false);
  };

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
            src={image}
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
        <p className="mb-2">{property.propertyType} | {property.bedrooms} bed | {property.bathrooms} bath</p>
        <p className="mb-2">Amenities: {property.amenities.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p>{property.description}</p>
      </div>
      <button 
        onClick={() => setShowContactForm(true)} 
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      >
        Contact Now
      </button>
      {showContactForm && (
        <form onSubmit={handleContactSubmit} className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="text-2xl font-semibold mb-4">Contact Landlord</h2>
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
            rows="4"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}