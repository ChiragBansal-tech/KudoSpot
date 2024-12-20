import React, { useEffect, useState } from 'react';
import { fetchKudos } from '../services/api';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const [kudos, setKudos] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    // Fetch the logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user && user.username) {
      setLoggedInUser(user.username);
    }

    // Fetch kudos data
    const loadKudos = async () => {
      try {
        const { data } = await fetchKudos();
        setKudos(data);
      } catch (error) {
        console.error('Error fetching kudos:', error);
      }
    };

    loadKudos();
  }, []);

  return (
    <div className="bg-custom min-h-screen">
      <Navbar />
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-5">
          Welcome, <span className='text-blue-700'>{loggedInUser || 'User'}</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-6">All Kudos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kudos.map((kudo, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
            >
              <p className="text-lg font-semibold text-indigo-600">
                {kudo.sender} ➡️ {kudo.receiver}
              </p>
              <p className="text-gray-600 mt-2">
                Kudo Type: <span className="font-bold">{kudo.type}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Sent on: {new Date(kudo.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
