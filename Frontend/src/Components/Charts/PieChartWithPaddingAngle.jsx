import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,Legend } from 'recharts';

// css Files
import "../../CSS/WebAdminDashboard/DADashboard.css";

function PieChartWithPaddingAngle({data}) {

  
  const COLORS = ['rgba(0, 207, 62, 0.81)', 'rgba(141, 0, 207, 0.8)', '#ff2edc'];

  // Optional: You can add onMouseEnter function for event handling if needed.
  // const handlePieEnter = (data, index) => {
  //   console.log('Pie Entered:', data, index);
  // };

  return (
    <ResponsiveContainer width="100%" height={270}>
      {/* <PieChart onMouseEnter={handlePieEnter}> */}
      <PieChart>
        <Pie
          data={data}
          cx={150}
          cy={150}
          innerRadius={60}
          outerRadius={70}
          fill="#000000"
          paddingAngle={5}
          dataKey="value"
          animationDuration={800}
          animationEasing="ease-in-out"
          stroke="none"  // Make the border transparent
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          animationDuration={800}
          animationEasing="ease-in-out"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie> */}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartWithPaddingAngle;
