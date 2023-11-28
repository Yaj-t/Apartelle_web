import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink exact to="/PersonalDetails" activeClassName="active-link">
            Personal Details
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/Security" activeClassName="active-link">
            Security
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/Bookings" activeClassName="active-link">
            Bookings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
