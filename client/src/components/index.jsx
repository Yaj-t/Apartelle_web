import React from 'react'
import './styles/index.css'
import Footer from './Footer'
import NavBarOffline from './NavBars/NavBarOffline'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import FavoriteIcon from '@mui/icons-material/Favorite';

function index() {
  return (
    <div>
        <div className='banner-container'>
           <NavBarOffline/>

            <div className='banner'>
                <h1>BANNER</h1>
            </div>
        </div>

        <div className='rooms-container'>
            <div className='list-container'>
                <h1>Lists of <br /> Rooms</h1>
                <hr />

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
                </div>  
            </div>

            <div className='list-container'>
                <h1>Lists of <br /> Leisure Rooms</h1>
                <hr />

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
                </div>
            </div>

            <div className='list-container'>
                <h1>Top Rated <br /> Rooms</h1>
                <hr />

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
                </div>
            </div>
        </div>

        <div className='other-container'>
            <div className='discover-container'>
                <div className='list-container'>
                    <h1>Discover More About <br /> Marjhun's Apartelle </h1>
                    <hr />

                    <p> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. </p>
                    
                    <button id="login-btn"> Discover More! </button>
                </div>
                <CardMedia
                    id='discover-picture'
                    sx ={{ height: 440, width: 1400 }}
                    image="src/assets/Room_Picture.jpg"
                    title = "room picture"
                />
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default index
