import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const [currentBookings, setCurrentBookings] = useState([]);

    useEffect(() => {
        const fetchUserBookings = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3001/booking/my-bookings',{
                    headers: { accessToken: sessionStorage.getItem('accessToken') } 
                });
                const allBookings = response.data;
                const now = new Date();
                
                // Filter bookings
                console.log(allBookings)
                const upcoming = allBookings.filter(booking => new Date(booking.dateStart) > now && !booking.isCancelled);
                const past = allBookings.filter(booking => new Date(booking.dateEnd) < now && !booking.isCancelled);
                const cancelled = allBookings.filter(booking => booking.isCancelled);
                const current = allBookings.filter(booking => new Date(booking.dateStart) <= now && new Date(booking.dateEnd) >= now && !booking.isCancelled);
                
                console.log(`current ${current}`)
                console.log(`upcoming ${upcoming}`)
                console.log(`past ${past}`)
                console.log(`cancelled ${cancelled}`)
                setCurrentBookings(current);
                setBookings(allBookings);
                setUpcomingBookings(upcoming);
                setPastBookings(past);
                setCancelledBookings(cancelled);
            } catch (err) {
                setError('Error fetching bookings');
                console.error(err);
            }
            setIsLoading(false);
        };

        fetchUserBookings();
    }, []);

    const cancelBooking = async (bookingId) => {
        try {
            // Making a PUT request to update the booking's isCancelled field
            const response = await axios.put(`http://localhost:3001/booking/${bookingId}`, 
                { isCancelled: true }, // Update this field to true
                { headers: { accessToken: sessionStorage.getItem('accessToken') } }
            );
            // Update the bookings list after successful cancellation
            setBookings(currentBookings => currentBookings.map(booking => 
                booking.bookingId === bookingId ? { ...booking, isCancelled: true } : booking
            ));
        } catch (error) {
            console.error('Error cancelling booking:', error);
            // Handle error response appropriately
        }
    };

    const canCancelBooking = (booking) => {
        const bookingStartTime = new Date(booking.dateStart);
        const bookingEndTime = new Date(booking.dateEnd);
        const currentTime = new Date();
        const hoursDiff = Math.abs(currentTime - new Date(booking.createdAt)) / 36e5;
        
        const isPastBooking = bookingEndTime < currentTime;
        const isCurrentBooking = bookingStartTime <= currentTime && bookingEndTime >= currentTime;
    
        // Booking cannot be cancelled if:
        // - It's already cancelled
        // - It's a past booking
        // - It's a current booking
        // - It was booked more than 12 hours ago
        return !booking.isCancelled && !isPastBooking && !isCurrentBooking && hoursDiff <= 12;
    };
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const renderBookingList = (bookingsList, isPastBookingList = false) => (
        <ul>
            {bookingsList.map(booking => (
                <li key={booking.bookingId}>
                    {/* Display booking details here */}
                    <p>Booking ID: {booking.bookingId}</p>
                    <p>Room ID: {booking.roomId}</p>
                    <p>Start Date: {booking.dateStart}</p>
                    <p>End Date: {booking.dateEnd}</p>
                    <p>Booked on: {booking.createdAt}</p>
                    <p>Is Cancelled: {booking.isCancelled ? 'True' : 'False'}</p>
                    {canCancelBooking(booking) && (
                        <button onClick={() => cancelBooking(booking.bookingId)}>
                            Cancel Booking
                        </button>
                    )}
                    {isPastBookingList && (
                        // Replace '/review' with the actual path where users can write reviews
                        <Link to={`/addReview/${booking.bookingId}`}>Write a Review</Link>
                    )}
                </li>
            ))}
        </ul>
    );
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Bookings</h2>
            <h3>Current Bookings</h3>
            {renderBookingList(currentBookings)}

            <h3>Upcoming Bookings</h3>
            {renderBookingList(upcomingBookings)}

            <h3>Past Bookings</h3>
            {renderBookingList(pastBookings, true)}

            <h3>Cancelled Bookings</h3>
            {renderBookingList(cancelledBookings)}
        </div>
    );
}   


export default UserBookings;
