import React from 'react';
import SettingsSidebar from '../NavBars/SettingsSidebar';
import UserNavBar from '../NavBars/UserNavBar';
import { Link } from 'react-router-dom';
import SecurityCSS from '../../styles/settings/accountSecurity.module.css';
import Footer from '../Footer';

const SecuritySettings = () => {
  return (
    <div>
      <UserNavBar />

      <div className={SecurityCSS.securityContainer}>
        <SettingsSidebar />
        <div className={SecurityCSS.mainContent}>
          <div className={SecurityCSS.SecurityHeaderContainer}>
            <h1 className={SecurityCSS.securityHeader}>Security</h1>
            <h2 className={SecurityCSS.securitySubheader}>
              Adjust your security settings
            </h2>
          </div>

          <div className={SecurityCSS.contentWrapper}>
            <div className={SecurityCSS.content}>
              <hr className={SecurityCSS.dividerSecurity} />
              <div className={SecurityCSS.details}>
                <p className={SecurityCSS.contentParagraph}>Password</p>
                <span className={SecurityCSS.additionalText}>
                  Reset your password regularly to keep your account secure
                </span>
                <Link to='/ResetPassword' className={SecurityCSS.actionText}>
                  Reset
                </Link>
              </div>
            </div>

            <div className={SecurityCSS.content}>
              <hr className={SecurityCSS.dividerSecurity} />
              <div className={SecurityCSS.details}>
                <p className={SecurityCSS.contentParagraph}>Active Sessions</p>
                <span className={SecurityCSS.additionalText}>
                  Selecting 'Sign Out' will sign you out from all devices except
                  this one. The process can take up to 10 minutes.
                </span>
                <Link to='/ActiveSessions' className={SecurityCSS.actionText}>
                  Sign Out
                </Link>
              </div>
            </div>

            <div className={SecurityCSS.content}>
              <hr className={SecurityCSS.dividerSecurity} />
              <div className={SecurityCSS.details}>
                <p className={SecurityCSS.contentParagraph}>Delete</p>
                <span className={SecurityCSS.additionalText}>
                  Selecting 'Sign Out' will sign you out from all devices except
                  this one. The process can take up to 10 minutes.
                </span>
                <Link to='/DeleteAccount' className={SecurityCSS.actionText}>
                  Delete <br />
                  Account
                </Link>
              </div>
            </div>

            <hr className={SecurityCSS.dividerSecurity} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SecuritySettings;
