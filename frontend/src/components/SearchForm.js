import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={searchCriteria.location}
        onChange={handleChange}
        className="flex-grow border p-2 rounded text-gray-800"
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max price"
        value={searchCriteria.maxPrice}
        onChange={handleChange}
        className="w-32 border p-2 rounded text-gray-800"
      />
      <select
        name="propertyType"
        value={searchCriteria.propertyType}
        onChange={handleChange}
        className="border p-2 rounded text-gray-800"
      >
        <option value="">Any type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="studio">Studio</option>
      </select>
      <select
        name="bedrooms"
        value={searchCriteria.bedrooms}
        onChange={handleChange}
        className="border p-2 rounded text-gray-800"
      >
        <option value="">Any bedrooms</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
    </form>
  );
}