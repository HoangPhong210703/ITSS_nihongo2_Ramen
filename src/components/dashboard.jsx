import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981'];

const Dashboard = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [earningData, setEarningData] = useState(null); 
  const [spendingData, setSpendingData] = useState(null); 
  const [savingData, setSavingData] = useState(null); 



  useEffect(() => {
    axios.get('http://localhost:3000/balance')
      .then(res => setBalanceData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/earnings')
      .then(res => setEarningData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/spendingDetails')
      .then(res => setSpendingData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/savingHistory')
      .then(res => setSavingData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!balanceData || !earningData || !spendingData ) return <div>Loading...</div>;


  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Tổng quan */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <div className="text-4xl font-semibold text-gray-700">
            {(balanceData.spending + balanceData.saving + balanceData.cash).toFixed(2).replace('.', ',')}
          </div>
          <div className="text-gray-400 text-xl">Total balance</div>
          <div className="mt-2 space-y-1 text-sm">
            <div><span className="text-blue-700 font-semibold">Spending account:</span> {balanceData.spending.toFixed(2).replace('.', ',')}</div>
            <div><span className="text-green-700 font-semibold">Saving account:</span> {balanceData.saving.toFixed(2).replace('.', ',')}</div>
            <div><span className="text-gray-700 font-semibold">Cash:</span> {balanceData.cash}</div>
          </div>
        </div>
        <PieChart width={180} height={180}>
          <Pie
            data={[
              { name: 'Spending', value: balanceData.spending },
              { name: 'Saving', value: balanceData.saving }
            ]}
            innerRadius={50}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
          >
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} stroke="#3b82f6" />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Earnings & Spending */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Earnings */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="font-semibold text-lg mb-2">Earnings this month</div>
          <PieChart width={180} height={180}>
            <Pie
              data={[
                { name: 'Spend', value: earningData.spend },
                { name: 'Save', value: earningData.save }
              ]}
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
            >
              <Cell fill="#bfdbfe" />
              <Cell fill="#d1fae5" />
            </Pie>
          </PieChart>
        </div>

        {/* Spending */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="font-semibold text-lg mb-2">Spent this month</div>
          <PieChart width={180} height={180}>
            <Pie
              data={[
                { name: 'Food', value: spendingData .food },
                { name: 'Rent', value: spendingData .rent }
              ]}
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
            >
              <Cell fill="#d1fae5" />
              <Cell fill="#bfdbfe" />
            </Pie>
          </PieChart>
        </div>
      </div>

      {/* Saving Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="font-semibold text-lg mb-4">Saving</div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={savingData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#3b82f6" fill="#bfdbfe" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
  
