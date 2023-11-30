import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "./Bookings.css";

const Bookings = () => {
  return (
    <div className="bookings-container">
      <Sidebar />
      <div className="divider-vertical-bookings"></div>
      <div className="main-content">
        <h1 className="bookings-header">Bookings</h1>
        <h2 className="bookings-subheader">Track your bookings here</h2>
        <hr className="divider-bookings" />
        {/* Add more content related to bookings here */}
      </div>
    </div>
  );
};

export default Bookings;
