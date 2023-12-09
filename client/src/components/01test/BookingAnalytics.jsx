import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/analytics/bookings`, {
          params: { 
            dateStart: startDate.toISOString().split('T')[0],
            dateEnd: endDate.toISOString().split('T')[0]
          }
        });
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <h2>Booking Analytics</h2>
      <DatePicker selected={startDate} onChange={setStartDate} />
      <DatePicker selected={endDate} onChange={setEndDate} />
      <div>
        {analyticsData.map((data, index) => (
          <div key={index}>
            <p>Room ID: {data.roomId}</p>
            <p>Total Bookings: {data.totalBookings}</p>
            <p>Total Revenue: {data.totalRevenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingAnalytics;
