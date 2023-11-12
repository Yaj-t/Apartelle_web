import React from 'react'
import NavBarOffline from './NavBars/NavBarOffline'
import Footer from './Footer';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import './styles/allRooms.css'


function AllRooms() {
  return (
    <div>
      <NavBarOffline />
      
      <div className='filter-container'>
        <form action="" method="" className='search-bar'>
          <input type="text" placeholder='Search...'/>
          <button className='search-btn'><SearchIcon fontSize='small'/></button>
        </form>

        <button id='filter-btn'>
          <TuneIcon />
          Filters
        </button>
      </div>

        <div className='card-container'>
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

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280  }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>
          
          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>

          <Card sx={{ width: 280 }}>
              <CardMedia
                  sx ={{ height: 240 }}
                  image="src/assets/Room_Picture.jpg"
                  title = "room picture"
              />
              <p> Well Furnished Apartment </p>
              <p> 100 Small Street, LA, USA</p>
          </Card>
      </div>  

      <Footer />
    </div>
  )
}

export default AllRooms
