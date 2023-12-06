import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        console.log(roomId)
        const response = await axios.get(`http://localhost:3001/room/${roomId}`);
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Room Details</h2>
      <p>Room Number: {room.roomNumber}</p>
      <p>Price: {room.price}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Description: {room.description}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default RoomDetails;
