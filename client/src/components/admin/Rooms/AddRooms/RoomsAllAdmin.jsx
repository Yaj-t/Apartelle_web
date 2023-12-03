import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import RoomsAllCSS from '../../../../styles/admin/roomsAllAdmin.module.css';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import NavBarDashboard from '../../../NavBars/NavBarDashboard';
import RoomImage from '../../../../assets/Room_Picture.jpg';

function RoomsAllAdmin() {
  const [rooms, setRooms] = useState([]); // State to store room data

  useEffect(() => {
    // Fetch room data from 'http://localhost:3001/room/'
    axios.get('http://localhost:3001/room/')
      .then((response) => {
        setRooms(response.data); // Set the fetched data to the 'rooms' state
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
        // Handle the error appropriately
      });
  }, []);

  return (
    <div>
      <NavBarDashboard />

      <div className={RoomsAllCSS.roomContainer}>
        <div className={RoomsAllCSS.filterContainer}>
          <form action='' method='' className={RoomsAllCSS.searchBar}>
            <input type='text' placeholder='Search...' />
            <button className={RoomsAllCSS.searchBtn}>
              <SearchIcon fontSize='small' />
            </button>
          </form>

          <button id={RoomsAllCSS.filterBtn}>
            <TuneIcon />
            Filters
          </button>
        </div>

        <div className={RoomsAllCSS.cardContainer}>
          {rooms.map((room) => (
            <Link to={`/admin/rooms/showAllRooms/roomDetails/${room.id}`} key={room.id}>
              <Card sx={{ width: 280 }}>
                <CardMedia
                  sx={{ height: 240 }}
                  image={RoomImage} // You may need to adjust the image path
                  title='room picture'
                />
                <p>{room.description}</p>
                <p>{room.price}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomsAllAdmin;
