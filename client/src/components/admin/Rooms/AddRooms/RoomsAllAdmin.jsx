import React from 'react'
import { Link } from 'react-router-dom';
import RoomsAllCSS from '../../../../styles/admin/roomsAllAdmin.module.css'
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import NavBarDashboard from '../../../NavBars/NavBarDashboard'

function RoomsAllAdmin() {
  return (
    <div>
      <NavBarDashboard />

      <div className={RoomsAllCSS.roomContainer}>
        <div className={RoomsAllCSS.filterContainer}>
          <form action="" method="" className={RoomsAllCSS.searchBar}>
            <input type="text" placeholder='Search...'/>
            <button className={RoomsAllCSS.searchBtn}><SearchIcon fontSize='small'/></button>
          </form>

          <button id={RoomsAllCSS.filterBtn}>
            <TuneIcon />
            Filters
          </button>
        </div>

          <div className={RoomsAllCSS.cardContainer}>
            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>

            <Link to='/admin/rooms/showAllRooms/roomDetails'>
                <Card sx={{ width: 280 }}>
                    <CardMedia
                        sx ={{ height: 240 }}
                        image="src/assets/Room_Picture.jpg"
                        title = "room picture"
                    />
                    <p> Well Furnished Apartment
                    </p> 
                    <p>100 Small Street, LA, USA</p>
                </Card>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default RoomsAllAdmin
