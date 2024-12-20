import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import Toaster from '../components/Toaster';

const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [showSuccessToaster, setShowSuccessToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setShowSuccessToaster(false);
    setShowErrorToaster(false);

    try {
      const { data } = await loginUser(email);
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      setShowSuccessToaster(true);

      // Redirect to landing page after 3 seconds
      setTimeout(() => navigate('/landing'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setShowErrorToaster(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Toaster for Success */}
      {showSuccessToaster && (
        <Toaster
          message="Logged in successfully!"
          type="success"
          onClose={() => setShowSuccessToaster(false)}
        />
      )}

      {/* Toaster for Error */}
      {showErrorToaster && (
        <Toaster
          message={error}
          type="error"
          onClose={() => setShowErrorToaster(false)}
        />
      )}

      <h1 className="text-4xl font-bold mb-6 text-blue-500">Welcome to KudoSpot!</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/add-user')}
          className="text-blue-500 underline cursor-pointer"
        >
          Add New User
        </span>
      </p>
    </div>
  );
};

export default WelcomePage;
