import React from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BedIcon from '@mui/icons-material/Bed';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from "../../assets/logo.png"
import NavAdminCSS from '../../styles/navbar/navbarAdmin.module.css'

function NavBarDashboard() {
  return (
    <div>
        <div className={NavAdminCSS.navDashContainer}>
            <div className={NavAdminCSS.upperLinkContainer}>
                <Link to='/admin/home'> <img src={Logo} alt="logo" width='80px'/> </Link>
                <Link to="/admin/home"><HomeIcon /></Link>
                <Link to="/admin/reservation"><EventNoteIcon/></Link>
                <Link to="/admin/rooms"><BedIcon/></Link>
                <Link to="/admin/personnel"><GroupsIcon/></Link>
            </div>
            <SettingsIcon />
        </div>
    </div>
  )
}

export default NavBarDashboard
