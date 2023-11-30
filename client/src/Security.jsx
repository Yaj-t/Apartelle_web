import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "./Security.css";

const Security = () => {
  return (
    <div className="security-container">
      <Sidebar />
      <div className="divider-vertical-security"></div>
      <div className="main-content">
        <h1 className="security-header">Security</h1>
        <h2 className="security-subheader">Adjust your security settings</h2>
        <hr className="divider-security" />
        <div className="content-wrapper">
          <div className="content">
            <p className="content-paragraph">Password</p>
            <span className="additional-text">
              Reset your password regularly to keep your account secure
            </span>
            <Link to="/ResetPassword" className="action-text">
              Reset
            </Link>
          </div>
          <hr className="divider-security" />
          <div className="content">
            <p className="content-paragraph">Active Sessions</p>
            <span className="additional-text">
              Selecting 'Sign Out' will sign you out from all devices except
              this one. The process can take up to 10 minutes.
            </span>
            <Link to="/ActiveSessions" className="action-text">
              Sign Out
            </Link>
          </div>
          <hr className="divider-security" />
          <div className="content">
            <p className="content-paragraph">Delete</p>
            <span className="additional-text">
              Selecting 'Sign Out' will sign you out from all devices except
              this one. The process can take up to 10 minutes.
            </span>
            <Link to="/DeleteAccount" className="action-text">
              Delete Account
            </Link>
          </div>
          <hr className="divider-security" />
        </div>
      </div>
    </div>
  );
};

export default Security;
