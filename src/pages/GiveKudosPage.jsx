import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchKudosOptions, giveKudos } from '../services/api';
import Navbar from '../components/Navbar';
import Toaster from '../components/Toaster';
import { useNavigate } from 'react-router-dom';

const GiveKudosPage = () => {
  const [users, setUsers] = useState([]);
  const [kudoTypes, setKudoTypes] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [kudoType, setKudoType] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(user?.username);

        const [usersResponse, kudosResponse] = await Promise.all([
          fetchUsers(),
          fetchKudosOptions(),
        ]);

        setUsers(usersResponse.data.filter((u) => u.username !== user?.username));
        setKudoTypes(kudosResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleGiveKudos = async (e) => {
    e.preventDefault();
    setError('');
    setShowToaster(false);

    try {
      await giveKudos({ sender: loggedInUser, receiver, type: kudoType });
      setShowToaster(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending kudos.');
    }
  };
  const handleClick = () => {
    navigate('/landing');
  }
  return (
    <div className="bg-custom min-h-screen">
      <Navbar />
      {showToaster && <Toaster message="Kudo sent successfully!" />}
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Give Kudos</h1>
          <form onSubmit={handleGiveKudos}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select User</label>
              <select
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
                required
              >
                <option value="">Choose a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Kudo Type</label>
              <select
                value={kudoType}
                onChange={(e) => setKudoType(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-200"
                required
              >
                <option value="">Choose a kudo type</option>
                {kudoTypes.map((type) => (
                  <option key={type._id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              onClick={handleClick}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
            >
              Send Kudos
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveKudosPage;
