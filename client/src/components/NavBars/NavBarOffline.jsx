import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import '../styles/navbar/navbarOffline.css'

function NavBarOffline() {
  return (
    <div>
        <div className="nav-container">
            <button className='search-btn'><SearchIcon fontSize='medium'/></button>
                <h1> LOGO </h1>
            <button id="login-btn"> LOGIN </button>
        </div>
    </div>
  )
}

export default NavBarOffline
