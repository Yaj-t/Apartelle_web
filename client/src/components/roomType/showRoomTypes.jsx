import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/roomType/');
                setRoomTypes(response.data);
            } catch (err) {
                setError('Error fetching room types');
                console.error(err);
            }
        };

        fetchRoomTypes();
    }, []);

    return (
        <div>
            <h1>Room Types</h1>
            {error && <p>{error}</p>}
            <ul>
                {roomTypes.map(roomType => (
                    <li key={roomType.roomTypeID}>
                        <h2>{roomType.typeName}</h2>
                        <p>{roomType.typeDescription}</p>
                        <p>{roomType.price}</p>
                        <p>{roomType.capacity}</p>
                        <p>{roomType.bedCount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomTypes;
