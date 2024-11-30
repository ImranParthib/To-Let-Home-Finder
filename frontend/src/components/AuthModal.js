import { useState } from 'react';
import axios from 'axios';

export default function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (response.data.status === 'ok') {
        if (isLogin) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          
          onLogin({
            ...response.data.user,
            token
          });
          onClose();
        } else {
          setSuccessMessage('Registration successful! Please login.');
          setIsLogin(true);
          setFormData({ username: '', password: '' });
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-blue-100/20 overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-[1.02]">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
          <h2 className="text-3xl font-bold text-white text-center tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:rotate-90 transition-transform duration-300 p-2 rounded-full hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="animate-shake mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="animate-bounce mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-black"
                required
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-black"
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccessMessage('');
                setFormData({ username: '', password: '' });
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 hover:underline"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}