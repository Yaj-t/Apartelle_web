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
        const response = await axios.get('http://localhost:3001/booking/', {
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
      <ul>
        {bookings.map(booking => (
          <li key={booking.bookingId}>
            User ID: {booking.userId}, Room ID: {booking.roomId}, Start: {booking.dateStart}, End: {booking.dateEnd}, Amount: {booking.amount}
            {/* Add more booking details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsList;
