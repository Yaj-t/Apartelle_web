import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SettingsCSS from '../../styles/settings/accountSettings.module.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LockIcon from '@mui/icons-material/Lock';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Footer from '../Footer';
import UserNavBar from '../NavBars/UserNavBar';

const AccountSettings = () => {
  return (
    <div>
      <UserNavBar />
      <div className={SettingsCSS.accountContainer}>
        <h1 className={SettingsCSS.accountHeader}>Account Settings</h1>
        <h2 className={SettingsCSS.accountSubHeader}>
          Organize your stay and experience
        </h2>
        <div className={SettingsCSS.buttonContainer}>
          <Link to='manage-account/'>
            <button>
              <ManageAccountsIcon fontSize='large' />
              <div className={SettingsCSS.label}>
                <h3>Personal Details</h3>
                <p>Edit your personal information</p>
              </div>
            </button>
          </Link>

          <Link to='security/'>
            <button>
              <LockIcon fontSize='large' />
              <div className={SettingsCSS.label}>
                <h3>Security</h3>
                <p>Manage your account security</p>
              </div>
            </button>
          </Link>

          <Link to='reservation/'>
            <button>
              <EditCalendarIcon fontSize='large' />
              <div className={SettingsCSS.label}>
                <h3>Booking</h3>
                <p>View and Manage your bookings</p>
              </div>
            </button>
          </Link>

          <Link to='/'>
            <button>
              <HomeRoundedIcon fontSize='large' />
              <div className={SettingsCSS.label}>
                <h3>Home</h3>
                <p>Go back to the Home Page</p>
              </div>
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountSettings;
