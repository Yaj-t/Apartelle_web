import React from 'react';
import SettingsSidebar from '../NavBars/SettingsSidebar';
import UserNavBar from '../NavBars/UserNavBar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import ReserveSettingsCSS from '../../styles/settings/reservationSettings.module.css';
import UserBookings from '../01test/UserBookings'

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
          <div>
            <UserBookings />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationsSettings;
