"use client"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const initialData = [
  { name: 'Sun', visit: 0 },
  { name: 'Mon', visit: 0 },
  { name: 'Tue', visit: 0 },
  { name: 'Wed', visit: 0 },
  { name: 'Thu', visit: 0 },
  { name: 'Fri', visit: 0 },
  { name: 'Sat', visit: 0 },
];

function Chart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // الحصول على البيانات المحفوظة من التخزين المحلي أو استخدام البيانات الأولية
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('weeklyData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }
  }, []);

  useEffect(() => {
    // زيادة عدد الزيارات لليوم الحالي إذا كان المسار هو الجذر
    const incrementVisit = () => {
      // if (window.location.pathname === '/') {
        setData(prevData => {
          const newData = prevData.map((entry) => {
            if (entry.name === getCurrentDay()) {
              return { ...entry, visit: entry.visit + 1 };
            }
            return entry;
          });
          // حفظ البيانات المحدثة في التخزين المحلي
          localStorage.setItem('weeklyData', JSON.stringify(newData));
          return newData;
        });
      // }
    };

    // زيادة عدد الزيارات مرة واحدة عند تحميل المكون
    incrementVisit();
  }, []);

  const getCurrentDay = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    return dayNames[today];
  };

  return (
    <div className='h-[450px] p-3 bg-[#182237] rounded-lg'>
      <h1 className='text-[#b7bac1] font-bold mb-5 ml-3'>weekly report</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
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
