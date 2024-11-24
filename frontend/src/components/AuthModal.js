import { useState } from 'react';

export default function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate login (in a real app, you'd validate with a backend)
      onLogin(formData);
    } else {
      // Simulate registration (in a real app, you'd send this to a backend)
      console.log('Register:', formData);
      onLogin(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2 text-gray-800"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-800"
              required
            />
          </div>
          {isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isAdmin" className="text-gray-700">Login as Admin</label>
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        <button onClick={onClose} className="mt-4 w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-gray-800">
          Close
        </button>
      </div>
    </div>
  );
}