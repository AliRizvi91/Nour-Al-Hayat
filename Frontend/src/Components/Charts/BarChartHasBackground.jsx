import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Css Files
import "../../CSS/WebUserDashboard/UDashboard.css";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function BarChartHasBackground() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="6"
          stroke="rgba(255, 255, 255, 0.16)"  // Make horizontal lines transparent
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#091d24',  // Dark background for tooltip
            color: 'white',  // White text color
            borderRadius: '4px',  // Rounded corners
            border: '3px solid rgba(0, 0, 0, 0.3)' // Light border
          }}
          itemStyle={{
            color: 'white'  // Ensure items within tooltip are white
          }}
          cursor={false}  // Hide the cursor
        />

        

        <Bar
          dataKey="pv"
          fill="rgba(0, 207, 62, 0.81)"
          background={{ fill: '#00000000' }}
          radius={[3, 3, 0, 0]}  // Apply rounding to the top corners
          barSize={16} // Set width of the bars to 2rem (32px)
        />
        <Bar
          dataKey="uv"
          fill="rgba(141, 0, 207, 0.8)"
          radius={[3, 3, 0, 0]}  // Apply rounding to the top corners
          barSize={16} // Set width of the bars to 2rem (32px)
        />
        <Legend 
          iconType="circle"  // Change the legend items to circle
          iconSize={10}  // Set the size of the circles
          wrapperStyle={{
            fontSize: '14px',  // Optional: Style the text in the legend
            color: 'white',  // Optional: Set the color of the legend text
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartHasBackground;
