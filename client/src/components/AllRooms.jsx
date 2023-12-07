import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserNavBar from './NavBars/UserNavBar';
import Footer from './Footer';
import TuneIcon from '@mui/icons-material/Tune';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import AllRoomsCSS from '../styles/allRooms.module.css';
import axios from 'axios'; // Import axios
import RoomImage from '../assets/Room_Picture.jpg';

function AllRooms() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  useEffect(() => {
    // Function to fetch rooms based on the current query
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/room');

        // Apply search query filter
        const filteredRooms = response.data.filter(
          room =>
            room.description.toLowerCase().includes(query.toLowerCase()) &&
            (selectedRoomTypes.length === 0 ||
              selectedRoomTypes.includes(room.roomTypeId))
        );

        setRooms(filteredRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    // Fetch rooms when the component mounts and whenever the query changes
    fetchRooms();
  }, [query, selectedRoomTypes]); // Include query as a dependency to re-run the effect when it changes

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
    fetchRoomTypes();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = e => {
      if (!menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

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

  return (
    <div>
      <UserNavBar />

      <div className={AllRoomsCSS.filterContainer}>
        <div className={AllRoomsCSS.searchBar}>
          <input
            type='text'
            placeholder='Search...'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className={AllRoomsCSS.dropdownFilter} ref={menuRef}>
          <button id={AllRoomsCSS.filterBtn} onClick={toggleMenu}>
            <TuneIcon />
            Filters
          </button>

          <div
            className={`${AllRoomsCSS.dropdownMenu} ${
              menuVisible ? AllRoomsCSS.visible : ''
            }`}>
            <ul>
              {roomTypes.map(roomType => (
                <li
                  key={roomType.roomTypeId}
                  onClick={() => handleRoomTypeChange(roomType.roomTypeId)}>
                  {roomType.typeName}
                </li>
              ))}
              <li>Price</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={AllRoomsCSS.cardContainer}>
        {rooms.map(room => (
          <Link key={room.id} to={`/roomDetails/${room.id}`}>
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

      <Footer />
    </div>
  );
}

export default AllRooms;
