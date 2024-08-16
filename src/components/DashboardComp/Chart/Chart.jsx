"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart({ initialData }) {
  // استخدم initialData بدلاً من الحالة المحلية
  return (
    <div className='h-[580px] p-3 bg-[#182237] rounded-lg'>
      <h1 className='text-[#b7bac1] font-bold mb-5 ml-3'>weekly report</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={initialData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={{ background: "#f23fr4", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;