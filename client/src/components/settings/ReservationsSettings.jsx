import React, { useState, useEffect } from "react";
import axios from "axios";
import SettingsSidebar from "../NavBars/SettingsSidebar";
import UserNavBar from "../NavBars/UserNavBar";
import Footer from "../Footer";
import {
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
// import { useParams } from "react-router-dom";
import ReserveSettingsCSS from "../../styles/settings/reservationSettings.module.css";
import UserBookings from "../01test/UserBookings";
import picture from "../../assets/Room_Picture.jpg";

const ReservationsSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [bookingCancelled, setBookingCancelled] = useState(null)

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/booking/my-bookings`,
          {
            headers: { accessToken: sessionStorage.getItem("accessToken") },
          }
        );
        console.log(response.data);
        setBookingData(response.data);
      } catch (err) {
        setError("Room not found or an error occurred.");
        console.error(err);
      }
    };

    fetchRoomData();
  }, []);

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      console.log(sessionStorage.getItem("accessToken"))
      const response = await axios.delete(`http://localhost:3001/booking/my-bookings/${bookingId}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") }
      });
  
      if (response.status === 200) {
        // Remove the cancelled booking from the bookingData state
        const updatedBookings = bookingData.filter(booking => booking.bookingId !== bookingId);
        setBookingData(updatedBookings);
        setBookingCancelled(true); // You might want to handle this state differently
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError('Error occurred while canceling the booking.');
    }
  };
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
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setBookingCancelled(true);
    setIsModalOpen(false);
  };

  const handleViewDetailsClick = () => {
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };

  return (
    <div>
      <UserNavBar />

      <div className={ReserveSettingsCSS.bookingsContainer}>
        <SettingsSidebar />
        <div className={ReserveSettingsCSS.mainContent}>
          <h1 className={ReserveSettingsCSS.bookingsHeader}>Bookings</h1>
          <h2 className={ReserveSettingsCSS.bookingsSubheader}>
            Track your bookings here
          </h2>
          <hr className={ReserveSettingsCSS.dividerBookings} />
          {bookingData && bookingData.map((booking, index) => (
          <Card>
            <div className={ReserveSettingsCSS["card-container"]}>
              <CardMedia
                className={ReserveSettingsCSS["room-picture"]}
                image={picture}
                title="room picture"
              />
              <div className={ReserveSettingsCSS["room-booking"]}>
                <div className={ReserveSettingsCSS["room-details"]}>
                  
                  <h4 className={ReserveSettingsCSS["text"]}>
                    Room# {booking.Room.roomNumber}
                  </h4>
                  <div className={ReserveSettingsCSS["details"]}>
                    <div className={ReserveSettingsCSS["para"]}>
                      <p>
                        Check In:{" "}
                        <span className={ReserveSettingsCSS["blurey"]}>
                          {booking.dateStart}
                        </span>
                      </p>
                    </div>
                    <div className={ReserveSettingsCSS["para"]}>
                      <p>
                        Duration:{" "}
                        <span className={ReserveSettingsCSS["blurey"]}>
                          {calculateDuration(booking.dateStart, booking.dateEnd)} days
                        </span>{" "}
                      </p>
                    </div>
                    <div className={ReserveSettingsCSS["para"]}>
                      <p>
                        Capacity:{" "}
                        <span className={ReserveSettingsCSS["blurey"]}>
                          {booking.Room.capacity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <h4 className={ReserveSettingsCSS["text"]}>PHP {booking.amount}</h4>
                </div>
              </div>

              <div className={ReserveSettingsCSS.ViewDetails}>
                <button
                  className={ReserveSettingsCSS["button2"]}
                  onClick={handleViewDetailsClick}
                >
                  View Details
                </button>
                <Dialog
                  open={isDetailsModalOpen}
                  onClose={handleCloseDetailsModal}
                >
                  <DialogTitle>Booking Details</DialogTitle>
                  <DialogContent>
                    {bookingData ? (
                      <div>
                        {/* Display the fetched data */}
                        <p>Room ID: {bookingData.roomId}</p>
                        <p>Check-in Date: {bookingData.checkInDate}</p>
                        {/* Add other properties as needed */}
                      </div>
                    ) : (
                      <p>No data available</p>
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              <div className={ReserveSettingsCSS["button-pos"]}>
                <button
                  className={ReserveSettingsCSS["button1"]}
                  onClick={handleCancelClick}
                >
                  Cancel Reservation
                </button>
                <Dialog open={isModalOpen} onClose={handleCloseModal}>
                  <DialogTitle className={ReserveSettingsCSS.DialogTitle}>
                    You are about to cancel your booking.
                  </DialogTitle>
                  <DialogContent className={ReserveSettingsCSS.dialogContent}>
                    <p>Are you sure you want to cancel?</p>
                  </DialogContent>

                  <div className={ReserveSettingsCSS.bothModalButtons}>
                  <button
                    className={ReserveSettingsCSS["button1"]}
                    onClick={() => handleCancelBooking(booking.bookingId)}
                  >
                    Cancel Reservation
                  </button>
                    <button
                      onClick={handleCloseModal}
                      className={ReserveSettingsCSS.modalButton1}
                    >
                      I change my mind
                    </button>
                  </div>
                </Dialog>
              </div>
            </div>
          </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationsSettings;
