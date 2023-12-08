import React from 'react';
import SettingsSidebar from '../NavBars/SettingsSidebar';
import UserNavBar from '../NavBars/UserNavBar';
import Footer from '../Footer';
import { Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import ReserveSettingsCSS from '../../styles/settings/reservationSettings.module.css';
import picture from '../../assets/Room_Picture.jpg'
const ReservationsSettings = () => {
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
          {/* Add more content related to bookings here */}
            {/* <CardMedia  
              sx={{ height: 200 }}
              image={picture} 
              title='room picture'
            /> */}
          <Card>
            <div className={ReserveSettingsCSS['card-container']}>
              <CardMedia  
                sx={{ width: 180, height: 120 }}
                image={picture} 
                title='room picture'
              />
              <div className={ReserveSettingsCSS['room-booking']} >
                <div className={ReserveSettingsCSS['room-details']}>
                  <h4 className={ReserveSettingsCSS['text']}>Fully Furnished Apartment</h4>
                  <div className={ReserveSettingsCSS['details']}>
                    <div className={ReserveSettingsCSS['para']}>
                      <p>Check In: <span className={ReserveSettingsCSS['blurey']}>12 Mar 2021</span></p>
                    </div>
                    <div className={ReserveSettingsCSS['para']}>
                      <p>Duration: <span className={ReserveSettingsCSS['blurey']}>Long ( 2 - 5 Years )</span> </p>
                    </div>
                  <div className={ReserveSettingsCSS['para']}>
                    <p>Guests: <span className={ReserveSettingsCSS['blurey']}>4 Adults</span></p>
                  </div>
                  </div>
                  <h4 className={ReserveSettingsCSS['text']}>$ 1000 USD</h4>
                </div>

              </div>
              <div className={ReserveSettingsCSS['button-pos']}>
                  <button className={ReserveSettingsCSS['button1']}>Cancel Reservation</button>
                  <button className={ReserveSettingsCSS['button2']}>View reserve</button>
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
