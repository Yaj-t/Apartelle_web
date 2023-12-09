import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import ReserveCSS from '../../../styles/admin/reservationAdmin.module.css';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3001/booking/', {
          headers: { accessToken: sessionStorage.getItem('accessToken') },
          params: { include: ['User', { model: 'Room', include: 'RoomType' }] }
        });
        console.log(response.data);
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCheckboxChange = bookingId => {
    // Handle checkbox change logic here
  };

  return (
    <div>
      <div className={ReserveCSS.reservationContainer}>
        <NavBarDashboard />
        <div className={ReserveCSS.contents}>
          <div className={ReserveCSS.filterContainer}>
            <form action='' method='' className={ReserveCSS.searchBar}>
              <input type='text' placeholder='Search...' />
            </form>

            {/* <button id={ReserveCSS.dateFilter}>
              Nov 10 - Nov 13
              <DateRangeIcon />
            </button> */}
          </div>

          <div className={ReserveCSS.reservationTable}>
            <table>
              <thead>
                <tr>
                  <th>
                    <CheckBoxIcon fontSize='small' />
                  </th>
                  <th> Room Number </th>
                  <th> Guest Name </th>
                  <th> Reservation Start </th>
                  <th> Reservation End </th>
                  <th> Amount </th>
                  <th> Status </th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.bookingId}>
                    <td>
                      <input
                        type='checkbox'
                        id={ReserveCSS.checkbox}
                        onChange={() => handleCheckboxChange(booking.bookingId)}
                      />
                    </td>
                    <td>{booking.Room && booking.Room.roomNumber}</td>
                    <td>
                      {booking.User &&
                        `${booking.User.firstName} ${booking.User.lastName}`}
                    </td>
                    <td>{booking.dateStart}</td>
                    <td>{booking.dateEnd}</td>
                    <td>{booking.amount}</td>
                    <td>{booking.isCancelled ? 'Cancelled' : 'Active'}</td>
                    <td>
                      <MoreHorizIcon fontSize='small' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
