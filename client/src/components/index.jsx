import React from 'react'
import './styles/index.css'
import Footer from './Footer'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import FavoriteIcon from '@mui/icons-material/Favorite';

function index() {
  return (
    <div>
        <div className="nav-container">
            <img id="search-btn" src="src/assets/search.png" alt="search button.png" />
            <h1> LOGO </h1>
            <button id="login-btn"> LOGIN </button>
        </div>

        <div className='banner'>
            <h1>BANNER</h1>
        </div>

        <div className='main-container'>
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

        <div className='main-container'>
            <div className='discover-container'>
                <div className='list-container'>
                    <h1>Discover More About <br /> Marjhun's Apartelle </h1>
                    <hr />

                    <p> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. </p>
                    
                    <button id="login-btn"> Discover More! </button>
                </div>
                <CardMedia
                    id='discover-picture'
                    sx ={{ height: 440, width: 2400 }}
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
