import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom'; 
import Bookroom from '../styles/admin/bookRooms.module.css';

function BookRoom({ room }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const roomId = room.roomId;
    const roomPrice = room.price;

    useEffect(() => {
        if (startDate && endDate && startDate < endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            setTotalPrice(diffDays * roomPrice);
        }
    }, [startDate, endDate, roomPrice]);

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

    const handleBooking = async () => {
        if (!startDate || !endDate || startDate >= endDate) {
            alert('Please select a valid date range.');
            return;
        }

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
                <div>
                <label htmlFor="Date-start">Date start</label>
                </div>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Start Date" className={Bookroom['date-box']} minDate={new Date()} maxDate={endDate}/> 
                <div>
                <label htmlFor="Date-end">Date end</label>
                </div>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} className={Bookroom['date-box']} placeholderText='End Date' minDate={new Date(new Date().getTime() + (24 * 60 * 60 * 1000))}/>
                <p>Total Price: <strong>{totalPrice}</strong></p>
                <button className={Bookroom['button']} onClick={handleBooking}>Book Now</button>
            </div>
        </div>
    );
}

export default BookRoom;
