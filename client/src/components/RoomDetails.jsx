import React, { useState, useEffect } from 'react';
import UserNavBar from './NavBars/UserNavBar';
import Footer from './Footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RoomDetailsCSS from '../styles/roomDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RoomImage from '../assets/Room_Picture.jpg';

const RoomDetails = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        console.log(roomId)
        const response = await axios.get(`http://localhost:3001/room/${roomId}`);
        console.log(response.data)
        setRoom(response.data);
      } catch (err) {
        setError('Room not found or an error occurred.');
        console.error(err);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>error</div>;
  }

  return (
    <div>
      <UserNavBar />

      <div className={RoomDetailsCSS.photocardsContainer}>
        <CardMedia
          id='discover-picture'
          sx={{ height: 700, width: 1000 }}
          image={RoomImage}
          title='room picture'
        />
      </div>

      <div className={RoomDetailsCSS.roomDetails}>
        <div className={RoomDetailsCSS.roomContainer}>
          <div className={RoomDetailsCSS.roomHeader}>
            <div className={RoomDetailsCSS.roomTitle}>
              <h1> {room.roomNumber} </h1>
              <h3> {room.RoomType.typeName} </h3>
              <h2> Capacity </h2>
              <h3> {room.capacity} </h3>
            </div>

            <FavoriteBorderIcon />
          </div>

          <p>
            {room.description}
          </p>

          {/* <div className={RoomDetailsCSS.amenitiesContainer}>
            <div className={RoomDetailsCSS.amenitiesDetails}>
              <h1>Offered Amenities</h1>
              <ul>
                <li> Kitchen </li>
                <li> Air-Conditioner </li>
                <li> Washer </li>
                <li> Television </li>
                <li> Free Wireless Internet </li>
              </ul>
            </div>

            <button> Show All Amenities </button>
          </div> */}
        </div>

        <div className={RoomDetailsCSS.roomCard}>
          <Card sx={{ width: 400 }}>
            <div className={RoomDetailsCSS.cardDetails}>
              <div id={RoomDetailsCSS.titleHeader}>
                <h2> Php {room.price} </h2>
                <hr />
              </div>

              {/* <div id={RoomDetailsCSS.bodyContent}>
                <p> Short Period: Php 1000 </p>
                <p> Medium Period: Php 2000 </p>
                <p> Long Period: Php 2000 </p>
              </div> */}

              <button> Reserve Now </button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoomDetails;
