import React from 'react';
import { Link } from 'react-router-dom';
import FooterCSS from '../styles/footer.module.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <div>
      <div className={FooterCSS.footerContainer}>
        <div className={FooterCSS.mainContainer}>
          <div className={FooterCSS.contentContainer}>
            <div className={FooterCSS.about}>
              <h1>MARJHUN'S APARTELLE</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod tempor incididunt <br /> ut labore et dolore
                magna aliqua.
              </p>
              <Link
                to='https://www.facebook.com/marjhunsapartelle'
                target='https://www.facebook.com/marjhunsapartelle'>
                <button>
                  <FacebookIcon /> Facebook
                </button>
              </Link>
            </div>

            <div className={FooterCSS.linkContainer}>
              <div className={FooterCSS.infoContainer}>
                <h2> COMPANY </h2>
                <ul>
                  <li>About Us</li>
                  <li>Legal Information</li>
                  <li>Contact Us</li>
                  <li>Blogs</li>
                </ul>
              </div>

              <div className={FooterCSS.infoContainer}>
                <h2> HELP CENTER </h2>
                <ul>
                  <li>Find a Room</li>
                  <li>How to Host?</li>
                  <li>Why Us?</li>
                  <li>FAQs</li>
                  <li>Rental Guides</li>
                </ul>
              </div>

              <div className={FooterCSS.infoContainer}>
                <h2> CONTACT INFO </h2>
                <ul>
                  <li>Phone: 1234567890</li>
                  <li>Email: company@gmail.com</li>
                  <li>Location: Cantagay, Jagna, Bohol</li>
                </ul>
              </div>
            </div>
          </div>

          <hr id={FooterCSS.footerHR} />
        </div>

        <div className={FooterCSS.copyrightContainer}>
          <div id={FooterCSS.rights}>
            <CopyrightIcon fontSize='very small' />
            <p>2022 thecreation.design | All rights raserved</p>
          </div>
          <p> Created with love by thecreation.design </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
