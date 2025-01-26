import React, { useState, useEffect } from 'react';
import "../../CSS/WebUserDashboard/UDashboard.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChart_C = ({ Data,XShow,YShow }) => {
  const [chartData, setChartData] = useState([]); // Fixed state name to `chartData`
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Ensure Data is provided and properly structured
    if (Data && Array.isArray(Data)) {
      // Assuming Data is an array of objects like { day: 'Monday', amount: 100 }
      setChartData(Data);
      setLoading(false);
    }
  }, [Data]); // Only runs when `Data` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey={XShow} tickFormatter={(value)=> new Date(value).toLocaleDateString()}/> {/* Assuming `name` is the key in Data */}
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey={YShow} stroke="#00bb05" fill="#00bb05" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Custom Tooltip to display the data
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="TooltipC">
        <strong>{new Date(label).toLocaleDateString()}</strong>
        <p className='pt-2'><strong>Booking:</strong> <span>{payload[0].value}</span></p>
      </div>
    );
  }
  return null; // Return null if tooltip is not active
};

export default AreaChart_C;
