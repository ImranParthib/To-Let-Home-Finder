import { useState } from "react";
import axios from "axios";

export default function NewListingForm({ onSubmit, isAuthenticated, onShowAuth }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [],
    images: [],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: checked
          ? [...prevData.amenities, name]
          : prevData.amenities.filter((item) => item !== name),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 2) {
      setError("Please upload exactly two images.");
    } else {
      setError("");
      setFormData((prevData) => ({ ...prevData, images: files }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onShowAuth();
      return;
    }

    if (formData.images.length !== 2) {
      setError("Please upload exactly two images.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("bedrooms", formData.bedrooms);
    formDataToSend.append("bathrooms", formData.bathrooms);
    formDataToSend.append("amenities", JSON.stringify(formData.amenities));

    formDataToSend.append("images", formData.images[0]);
    formDataToSend.append("images", formData.images[1]);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:5000/upload-listing", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });
      console.log(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error("Error uploading listing:", error);
      setError("Listing upload failed.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Please log in to add a new listing.</p>
        <button
          onClick={onShowAuth}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login / Register
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1 text-gray-700">Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded p-2 text-gray-800" required />
      </div>
      <div>
        <label htmlFor="location" className="block mb-1 text-gray-700">Location</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full border rounded p-2 text-gray-800" required />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1 text-gray-700">Price (per month)</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border rounded p-2 text-gray-800" required />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1 text-gray-700">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2 text-gray-800" rows="4" required></textarea>
      </div>
      <div>
        <label htmlFor="bedrooms" className="block mb-1 text-gray-700">Bedrooms</label>
        <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full border rounded p-2 text-gray-800" required />
      </div>
      <div>
        <label htmlFor="bathrooms" className="block mb-1 text-gray-700">Bathrooms</label>
        <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full border rounded p-2 text-gray-800" required />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Amenities</label>
        <div className="space-y-2">
          {["Parking", "Wifi", "Gym", "Pool"].map((amenity) => (
            <label key={amenity} className="flex items-center text-gray-700">
              <input type="checkbox" name={amenity} checked={formData.amenities.includes(amenity)} onChange={handleChange} className="mr-2" />
              {amenity}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="images" className="block mb-1 text-gray-700">Images</label>
        <input type="file" id="images" name="images" onChange={handleImageUpload} className="w-full border rounded p-2 text-gray-800" multiple accept="image/*" />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit Listing</button>
    </form>
  );
}
