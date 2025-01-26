import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend } from 'recharts';


function SimpleAreaChart() {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {/* Defining the gradient manually in the SVG */}
        <defs>
          <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fd0076a8" stopOpacity={1} />
            <stop offset="100%" stopColor="#fd00761a" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="4 4" stroke="#ffffff29" />
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
        {/* Apply the gradient here */}
        <Area type="monotone" dataKey="uv" stroke="#fd007654" fill="url(#uvGradient)" />
        <Legend 
                  iconType="circle"  // Change the legend items to circle
                  iconSize={10}  // Set the size of the circles
                  wrapperStyle={{
                    fontSize: '14px',  // Optional: Style the text in the legend
                    color: 'white',  // Optional: Set the color of the legend text
                  }}
                />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default SimpleAreaChart;
