import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../assets/logo.png';
import NavBarOfflineCSS from '../../styles/navbar/navbarOffline.module.css';
import { Link } from 'react-router-dom';

function NavBarOffline() {
  return (
    <div>
      <div className={NavBarOfflineCSS.navContainer}>
        {/* <button className='search-btn'><SearchIcon fontSize='medium'/></button> */}
        <img src={Logo} alt='logo' width='80px' />
        <Link to='/login'>
          <button id={NavBarOfflineCSS.loginBtn}> LOGIN </button>
        </Link>
      </div>
    </div>
  );
}

export default NavBarOffline;
