import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavBar from './NavBars/UserNavBar';
import Footer from './Footer';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import AllRoomsCSS from '../styles/allRooms.module.css';
import axios from 'axios'; // Import axios
import RoomImage from '../assets/Room_Picture.jpg'
function AllRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms when the component mounts
    axios.get('http://localhost:3001/room')
      .then((response) => {
        // Set the fetched rooms in the state
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <UserNavBar />

      <div className={AllRoomsCSS.filterContainer}>
        <form action='' method='' className={AllRoomsCSS.searchBar}>
          <input type='text' placeholder='Search...' />
          <button className={AllRoomsCSS.searchBtn}>
            <SearchIcon fontSize='small' />
          </button>
        </form>

        <button id={AllRoomsCSS.filterBtn}>
          <TuneIcon />
          Filters
        </button>
      </div>

      <div className={AllRoomsCSS.cardContainer}>
        {rooms.map((room) => (
          <Link key={room.id} to={`/roomDetails/${room.id}`}>
            <Card sx={{ width: 280 }}>
              <CardMedia
                sx={{ height: 240 }}
                image={RoomImage} // Use the image property from your API response
                title='room picture'
              />
              <p>{room.description}</p>
              <p>{room.price}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default AllRooms;
