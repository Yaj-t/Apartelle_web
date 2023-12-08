import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/slick-style-custom.css';
import indexCSS from '../styles/index.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import UserNavBar from './NavBars/UserNavBar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ContainerSVG from '../assets/photo-container.svg';
import Logo from '../assets/logo.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AllRooms from './01test/allRooms';
import RoomImage from '../assets/Room_Picture.jpg';

function index() {
  const auth = sessionStorage.getItem('accessToken');
  const [rooms, setRooms] = useState([]); // State to store room data

  useEffect(() => {
    // Fetch room data from 'http://localhost:3001/room/'
    axios
      .get('http://localhost:3001/room/')
      .then(response => {
        setRooms(response.data); // Set the fetched data to the 'rooms' state
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
        // Handle the error appropriately
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  return (
    <div>
      <UserNavBar />
      <div className={indexCSS.bannerContainer}>
        <div className={indexCSS.banner}>
          <img src={ContainerSVG} alt='photo-container' />
          <div className={indexCSS.bannerHeader}>
            <div>
              <div id={indexCSS.logo}>
                <img src={Logo} alt='logo' width='200px' />
              </div>
              <h1>“A Stay in a Headland”</h1>
              <h2>
                Embrace Tranquility: Your Coastal Retreat at A Stay in a
                Headland. Where Every Sunset Beckons Serenity and Adventure only
                on Marjhun’s Apartelle!
              </h2>
            </div>

            {auth ? (
              <div></div> // what to design
            ) : (
              <Link to='/login'>
                <button id={indexCSS.bookButton}> BOOK NOW </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={indexCSS.roomsContainer}>
        <div className={indexCSS.listContainer}>
          <h1>
            Lists of <br /> Rooms
          </h1>
          <hr className={indexCSS.hr} />

          <div className={indexCSS.roomCarousel}>
            <Slider {...settings}>
              {rooms.map(room => (
                <Link to={`/roomDetails/${room.roomId}`} key={room.id}>
                  <Card sx={{ width: 280 }}>
                    <CardMedia
                      sx={{ height: 240 }}
                      image={RoomImage} // You may need to adjust the image path
                      title='room picture'
                    />
                    <div className={indexCSS.cardDetails}>
                      <p>{room.description}</p>
                      <p>{room.price}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className={indexCSS.otherContainer}>
        <div className={indexCSS.discoverContainer}>
          <div className={indexCSS.listContainer}>
            <h1>
              Discover More About <br /> Marjhun's Apartelle
            </h1>
            <hr className={indexCSS.hr} />

            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </p>

            <button id={indexCSS.loginBtn}> Discover More! </button>
          </div>
          <CardMedia
            id='discover-picture'
            sx={{ height: 440, width: 1400 }}
            image='src/assets/Room_Picture.jpg'
            title='room picture'
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default index;
