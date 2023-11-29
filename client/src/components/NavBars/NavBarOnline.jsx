import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import NavOnlineCSS from '../../styles/navbar/navbarOnline.module.css'

function NavBarOnline() {
  return (
    <div>
      <div className={NavOnlineCSS.navContainer}>            
            <Link to='/'> <img src={Logo} alt="logo" width='80px'/> </Link>
            <div className={NavOnlineCSS.navLinks}>
                <ul>
                    <Link to='/allRooms'> ROOMS </Link>
                </ul>
            </div>
            <button id={NavOnlineCSS.loginBtn}> LOGIN </button>
        </div>
    </div>
  )
}

export default NavBarOnline
