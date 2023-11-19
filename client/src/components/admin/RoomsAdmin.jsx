import React from 'react'
import { Link } from 'react-router-dom';
import RoomsAdminCSS from '../../styles/admin/roomsAdmin.module.css'
import NavBarDashboard from '../NavBars/NavBarDashboard'
import AddIcon from '@mui/icons-material/Add';

function RoomsAdmin() {
  return (
    <div>
        <NavBarDashboard/>
        <div className={RoomsAdminCSS.buttonContainer}>
            <Link to='/admin/rooms/addRooms'> <button> <b>ADD ROOMS</b> </button> </Link>
            <Link to='/admin/rooms/showAllRooms'> <button> <b>MANAGE ROOMS</b> </button> </Link>
        </div>
    </div>
    
  )
}

export default RoomsAdmin
