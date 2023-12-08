import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

function AvailableRooms() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAvailableRooms = async () => {
        try {
            setIsLoading(true);
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:3001/room/available-rooms?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
            console.log(response.data);
            setAvailableRooms(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            alert('Error fetching available rooms. Please check the console for more details.');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Check Room Availability</h1>
            <div>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                <button onClick={fetchAvailableRooms}>Check Availability</button>
            </div>
            {isLoading ? <p>Loading...</p> : (
                <div>
                    <h2>Available Rooms</h2>
                    {availableRooms.length > 0 ? (
                        <ul>
                            {availableRooms.map(room => (
                                <Link key={room.id} to={`/roomDetails/${room.roomId}`}>
                                    <li key={room.roomId}>{room.description} - {room.price}</li>
                                </Link>
                            ))}
                        </ul>
                    ) : <p>No rooms available for the selected dates.</p>}
                </div>
            )}
        </div>
    );
}

export default AvailableRooms;
