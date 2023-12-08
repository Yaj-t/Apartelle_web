import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

function BookRoom({ roomId }) {
    const [room, setRoom] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:3001/room/${roomId}`);   
                setRoom(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching room details:', err);
                setError('Error fetching room details');
                setIsLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    const handleBooking = async () => {
        try {
            setIsLoading(true);
            const bookingData = {
                roomId,
                dateStart: startDate.toISOString().split('T')[0],
                dateEnd: endDate.toISOString().split('T')[0]
            };
            const response = await axios.post('http://localhost:3001/booking/', bookingData, {
                headers: { accessToken: sessionStorage.getItem('accessToken') }
            });
            console.log(response.data);
            alert('Booking successful!');
        } catch (err) {
            console.error('Error creating booking:', err.response?.data || err.message);
            alert('Error creating booking: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Book a Room</h1>
            {room && (
                <div>
                    <h2>{room.name}</h2>
                    <p>{room.description}</p>
                    {/* Add more room details as needed */}
                </div>
            )}
            <div>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                <button onClick={handleBooking}>Book Now</button>
            </div>
        </div>
    );
}

export default BookRoom;
