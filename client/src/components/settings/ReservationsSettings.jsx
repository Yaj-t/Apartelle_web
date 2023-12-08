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
                    Fully Furnished Apartment
                  </h4>
                  <div className={ReserveSettingsCSS["details"]}>
                    <div className={ReserveSettingsCSS["para"]}>
                      <p>
                        Check In:{" "}
                        <span className={ReserveSettingsCSS["blurey"]}>
                          12 Mar 2021
                        </span>
                      </p>
                    </div>
                    <div className={ReserveSettingsCSS["para"]}>
                      <p>
                        Duration:{" "}
                        <span className={ReserveSettingsCSS["blurey"]}>
                          Long ( 2 - 5 Years )
                        </span>{" "}
                      </p>
                    </div>
                    <div className={ReserveSettingsCSS["para"]}>
                      <p>
                        Guests:{" "}
                        <span className={ReserveSettingsCSS["blurey"]}>
                          4 Adults
                        </span>
                      </p>
                    </div>
                  </div>
                  <h4 className={ReserveSettingsCSS["text"]}>$ 1000 USD</h4>
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
                      onClick={handleConfirmCancel}
                      className={ReserveSettingsCSS.modalButton2}
                    >
                      Proceed to Cancel
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationsSettings;
