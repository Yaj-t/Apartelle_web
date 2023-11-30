import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./AccountSettings.css";

const AccountSettings = () => {
  return (
    <div className="account-container">
      <h1 className="account-header">Account Settings</h1>
      <h2 className="account-subheader">Organize your stay and experience</h2>
      <div className="button-container">
        <Link to="/PersonalDetails">
          <button>
            <img src="/PersonalDetail.png" alt="Personal Detail" />
            <div>
              <h3>Personal Details</h3>
              <p>Edit your personal information</p>
            </div>
          </button>
        </Link>
        <Link to="/Security">
          <button>
            <img src="/Security.png" alt="Security" />
            <div>
              <h3>Security</h3>
              <p>Manage your account security</p>
            </div>
          </button>
        </Link>
        <button>
          <img src="/Booking.png" alt="Booking" />
          <div>
            <h3>Booking</h3>
            <p>View and manage your bookings</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
