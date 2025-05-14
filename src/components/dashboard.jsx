import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { balance, earnings, spendingDetails, savingHistory } = data;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Tổng quan */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <div className="text-4xl font-semibold text-gray-700">
            ${(balance.spending + balance.saving + balance.cash).toFixed(2)}
          </div>
          <div className="text-gray-400 text-xl">Total balance</div>
          <div className="mt-2 space-y-1 text-sm">
            <div><span className="text-blue-700 font-semibold">Spending account:</span> ${balance.spending}</div>
            <div><span className="text-green-700 font-semibold">Saving account:</span> ${balance.saving}</div>
            <div><span className="text-gray-700 font-semibold">Cash:</span> ${balance.cash}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
