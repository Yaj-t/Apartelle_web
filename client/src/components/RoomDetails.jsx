import React from 'react'
import NavBarOffline from './NavBars/NavBarOffline'
import NavBarOnline from './NavBars/NavBarOnline';
import Footer from './Footer';
import Card from '@mui/material/Card'; 
import CardMedia from '@mui/material/CardMedia'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RoomDetailsCSS from '../styles/roomDetails.module.css'


function RoomDetails() {
  return (
    <div>
      <NavBarOnline />

      <div className={RoomDetailsCSS.photocardsContainer}>
        <CardMedia
            id='discover-picture'
            sx ={{ height: 700, width: 1000 }}
            image="src/assets/Room_Picture.jpg"
            title = "room picture"
        />
      </div>

      <div className={RoomDetailsCSS.roomDetails}>
        <div className={RoomDetailsCSS.roomContainer}>
            <div className={RoomDetailsCSS.roomHeader}>
                <div className={RoomDetailsCSS.roomTitle}>
                        <h1> Room Type </h1>
                        <h3> Sub-Header</h3>
                </div>

                <FavoriteBorderIcon />
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <div className={RoomDetailsCSS.amenitiesContainer}>
                <div className={RoomDetailsCSS.amenitiesDetails}>
                    <h1>Offered Amenities</h1>
                    <ul>
                        <li> Kitchen </li>
                        <li> Air-Conditioner </li>
                        <li> Washer </li>
                        <li> Television </li>
                        <li> Free Wireless Internet </li>
                    </ul>
                </div>

                <button> Show All Amenities </button>    
            </div>
        </div>

        <div className={RoomDetailsCSS.roomCard}>
            <Card sx={{ width: 400 }}>
                <div className={RoomDetailsCSS.cardDetails}>
                    <div id={RoomDetailsCSS.titleHeader}>
                      <h2> Php 1000 - Php 2000 </h2>
                      <hr />
                    </div>

                    <div id={RoomDetailsCSS.bodyContent}>
                      <p> Short Period: Php 1000 </p>
                      <p> Medium Period: Php 2000 </p>
                      <p> Long Period: Php 2000 </p>
                    </div>

                    <button> Reserve Now </button>
                </div>
            </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default RoomDetails
