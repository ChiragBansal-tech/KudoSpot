import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';
import Toaster from '../components/Toaster';

const CreateUserPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showSuccessToaster, setShowSuccessToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const SECRET_KEY = 'CHIRAG@456'; // Hardcoded secret key

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setShowSuccessToaster(false);
    setShowErrorToaster(false);

    if (secretKey !== SECRET_KEY) {
      setError('Invalid Secret Key. Please try again.');
      setShowErrorToaster(true);
      return;
    }

    try {
      await createUser({ username, email });
      setShowSuccessToaster(true);
      setTimeout(() => navigate('/'), 5000); // Redirect to login after 5 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating user.');
      setShowErrorToaster(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Toaster for Success */}
      {showSuccessToaster && (
        <Toaster
          message="User created successfully!"
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

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New User</h1>
        <form onSubmit={handleCreateUser}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
              Secret Key
            </label>
            <input
              type="password"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Create User
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateUserPage;
