import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsSidebarCSS from '../../styles/navbar/settingsSidebar.module.css';

const SettingsSidebar = () => {
  return (
    <div className={SettingsSidebarCSS.sidebar}>
      <div className={SettingsSidebarCSS.upper}>
        <ul>
          <li>
            <Link to='/settings/manage-account/'>Personal Details</Link>
          </li>
          <li>
            <Link to='/settings/reservation/'>Bookings</Link>
          </li>
        </ul>
      </div>

      <Link to='/settings'>
        <div className={SettingsSidebarCSS.lower}>
          <ArrowBackIcon />
          Go back
        </div>
      </Link>
    </div>
  );
};

export default SettingsSidebar;
