import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    query: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Search Title
          </label>
          <input
            type="text"
            id="query"
            name="query"
            value={searchCriteria.query}
            onChange={handleChange}
            className="w-full p-2 text-black border rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by title..."
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchCriteria.location}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location..."
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={searchCriteria.minPrice}
            onChange={handleChange}
            className="w-full p-2 text-black border rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Min price..."
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={searchCriteria.maxPrice}
            onChange={handleChange}
            className="w-full text-black p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Max price..."
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
}