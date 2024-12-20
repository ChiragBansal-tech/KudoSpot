import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/api';
import BarChart from '../components/BarChart';
import UserTable from '../components/UserTable';
import Navbar from '../components/Navbar';

const AnalyticsPage = () => {
  const [kudoData, setKudoData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const { data } = await fetchAnalytics();
        setKudoData(data.kudoCounts); // Bar chart data
        setUserData(data.users);     // Table data
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className='bg-custom min-h-screen'>
      <Navbar />
      <div className="p-5 grid grid-cols-[60%_40%] gap-5">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Kudos Distribution</h2>
          <BarChart data={kudoData} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-10">Users and Kudos Received</h2>
          <UserTable users={userData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
