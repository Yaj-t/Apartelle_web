import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = sessionStorage.getItem('accessToken'); // Assuming the access token is stored in sessionStorage
        const response = await axios.get('http://localhost:3001/bookings/', {
          headers: { accessToken: sessionStorage.getItem('accessToken') }
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>Error loading bookings: {error}</p>;

  return (
    <div>
      <h2>Booking List</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Room ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            {/* Add more table headers for additional booking details */}
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingId}>
              <td>{booking.userId}</td>
              <td>{booking.roomId}</td>
              <td>{booking.dateStart}</td>
              <td>{booking.dateEnd}</td>
              <td>{booking.amount}</td>
              {/* Add more table cells for additional booking details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
