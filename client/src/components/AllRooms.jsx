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
import RoomImage from '../assets/Room_Picture.jpg';

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Function to fetch rooms based on the current query
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/room');
        const filteredRooms = response.data.filter(
          room =>
            room.description.toLowerCase().includes(query.toLowerCase()) ||
            room.price.toString().includes(query)
        );
        setRooms(filteredRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    // Fetch rooms when the component mounts and whenever the query changes
    fetchRooms();
  }, [query]); // Include query as a dependency to re-run the effect when it changes

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

        <button id={AllRoomsCSS.filterBtn}>
          <TuneIcon />
          Filters
        </button>
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
            </Card>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default AllRooms;
