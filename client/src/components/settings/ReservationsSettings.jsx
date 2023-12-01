import React from 'react';
import SettingsSidebar from '../NavBars/SettingsSidebar';
import UserNavBar from '../NavBars/UserNavBar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import ReserveSettingsCSS from '../../styles/settings/reservationSettings.module.css';

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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationsSettings;
