import React from 'react';
import { Link } from 'react-router-dom';
import indexCSS from '../styles/index.module.css';
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

function index() {
  const auth = sessionStorage.getItem('accessToken');

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
          <AllRooms /> {/* this is just a test, this needs to be fixed */}
        </div>
      </div>

      <div className={indexCSS.roomsContainer}>
        <div className={indexCSS.listContainer}>
          <h1>
            Top Rated <br /> Rooms
          </h1>
          <hr className={indexCSS.hr} />

          <div className={indexCSS.roomCards}>
            <button id={indexCSS.nextIcon}>
              <NavigateBeforeIcon fontSize='large' />
            </button>
            <div className={indexCSS.cardContainer}>
              <Card sx={{ width: 280 }}>
                <CardMedia
                  sx={{ height: 240 }}
                  image='src/assets/Room_Picture.jpg'
                  title='room picture'
                />
                <p> Well Furnished Apartment</p>
                <p>100 Small Street, LA, USA</p>
              </Card>

              <Card sx={{ width: 280 }}>
                <CardMedia
                  sx={{ height: 240 }}
                  image='src/assets/Room_Picture.jpg'
                  title='room picture'
                />
                <p> Well Furnished Apartment </p>
                <p> 100 Small Street, LA, USA</p>
              </Card>

              <Card sx={{ width: 280 }}>
                <CardMedia
                  sx={{ height: 240 }}
                  image='src/assets/Room_Picture.jpg'
                  title='room picture'
                />
                <p> Well Furnished Apartment </p>
                <p> 100 Small Street, LA, USA</p>
              </Card>

              <Card sx={{ width: 280 }}>
                <CardMedia
                  sx={{ height: 240 }}
                  image='src/assets/Room_Picture.jpg'
                  title='room picture'
                />
                <p> Well Furnished Apartment </p>
                <p> 100 Small Street, LA, USA</p>
              </Card>
            </div>

            <button id={indexCSS.backIcon}>
              <NavigateNextIcon fontSize='large' />
            </button>
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
