import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserNavBar from './NavBars/UserNavBar';
import Footer from './Footer';
import TuneIcon from '@mui/icons-material/Tune';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AllRoomsCSS from '../styles/allRooms.module.css';
import axios from 'axios'; // Import axios
import RoomImage from '../assets/Room_Picture.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AllRooms() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // 'asc' for ascending, 'desc' for descending
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Inside the useEffect, modify the fetchRooms function
  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/room');

      let filteredRooms = response.data.filter(
        room =>
          room.description.toLowerCase().includes(query.toLowerCase()) &&
          (selectedRoomTypes.length === 0 ||
            selectedRoomTypes.includes(room.roomTypeId))
      );

      // Sort the filtered rooms based on price
      if (sortOrder === 'asc') {
        filteredRooms = filteredRooms.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'desc') {
        filteredRooms = filteredRooms.sort((a, b) => b.price - a.price);
      }

      setRooms(filteredRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchAvailableRooms = async () => {
    if (!startDate || !endDate) {
      console.log('Start date or end date is not set.');
      return; // Exit the function if either date is null
    }
    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      const response = await axios.get(
        `http://localhost:3001/room/available-rooms?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching available rooms:', error);
    }
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, [startDate, endDate]);

  // Update the dependency array to include sortOrder
  useEffect(() => {
    // Fetch rooms when the component mounts and whenever the query, selected room types, or sort order changes
    fetchRooms();
  }, [query, selectedRoomTypes, sortOrder]);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/roomType/');
      setRoomTypes(response.data);
    } catch (err) {
      setError('Error fetching room types');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    if (startDate && endDate && endDate <= startDate) {
      setEndDate(null);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate && endDate <= startDate) {
      setEndDate(null);
    }
  }, [startDate, endDate]);

  const getRoomTypeName = roomTypeId => {
    const roomType = roomTypes.find(type => type.roomTypeId === roomTypeId);
    return roomType ? roomType.typeName : 'Unknown Room Type';
  };

  const handleRoomTypeChange = roomTypeId => {
    // Toggle selectedRoomTypes array
    setSelectedRoomTypes(prevRoomTypes => {
      if (prevRoomTypes.includes(roomTypeId)) {
        // Remove room type if already selected
        return prevRoomTypes.filter(type => type !== roomTypeId);
      } else {
        // Add room type if not selected
        return [...prevRoomTypes, roomTypeId];
      }
    });
    console.log('success:', roomTypeId);
  };

  const handleSortOrderChange = newSortOrder => {
    setSortOrder(newSortOrder === sortOrder ? null : newSortOrder);
  };

  return (
    <div>
      <UserNavBar />

      <div className={AllRoomsCSS.allRooms}>
        <div className={AllRoomsCSS.filterContainer}>
          <div className={AllRoomsCSS.filterMenu}>
            <ul>
              {roomTypes.map(roomType => (
                <li>
                  <input
                    type='checkbox'
                    onClick={() => handleRoomTypeChange(roomType.roomTypeId)}
                  />
                  <label>{roomType.typeName}</label>
                </li>
              ))}
              <li>
                <label>
                  <input
                    type='checkbox'
                    checked={sortOrder === 'asc'}
                    onChange={() => handleSortOrderChange('asc')}
                  />
                  Price <ArrowUpwardIcon fontSize='1rem' />
                </label>
              </li>
              <li>
                <label>
                  <input
                    type='checkbox'
                    checked={sortOrder === 'desc'}
                    onChange={() => handleSortOrderChange('desc')}
                  />
                  Price <ArrowDownwardIcon fontSize='1rem' />
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className={AllRoomsCSS.roomContainer}>
          <div className={AllRoomsCSS.filterContainer}>
            <div className={AllRoomsCSS.datePickers}>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText='Start Date'
                minDate={new Date()}
                maxDate={endDate}
              />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                placeholderText='End Date'
                minDate={startDate}
              />
            </div>
          </div>

          <div className={AllRoomsCSS.cardContainer}>
            {rooms.map(room => (
              <Link key={room.roomId} to={`/roomDetails/${room.roomId}`}>
                <Card sx={{ width: 280 }}>
                  <CardMedia
                    sx={{ height: 240 }}
                    image={RoomImage} // Use the image property from your API response
                    title='room picture'
                  />
                  <p>{room.description}</p>
                  <p>{room.price}</p>
                  <p>{getRoomTypeName(room.roomTypeId)}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AllRooms;
