import React from 'react';
import { Link } from 'react-router-dom';
import NavBarOffline from './NavBars/NavBarOffline';
import NavBarOnline from './NavBars/NavBarOnline';
import Footer from './Footer';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import AllRoomsCSS from '../styles/allRooms.module.css';

function AllRooms() {
  return (
    <div>
      <NavBarOnline />

      <div className={AllRoomsCSS.filterContainer}>
        <form action='' method='' className={AllRoomsCSS.searchBar}>
          <input type='text' placeholder='Search...' />
          <button className={AllRoomsCSS.searchBtn}>
            <SearchIcon fontSize='small' />
          </button>
        </form>

        <button id={AllRoomsCSS.filterBtn}>
          <TuneIcon />
          Filters
        </button>
      </div>

      <div className={AllRoomsCSS.cardContainer}>
        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>

        <Link to='/roomDetails'>
          <Card sx={{ width: 280 }}>
            <CardMedia
              sx={{ height: 240 }}
              image='src/assets/Room_Picture.jpg'
              title='room picture'
            />
            <p> Well Furnished Apartment</p>
            <p>100 Small Street, LA, USA</p>
          </Card>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default AllRooms;
