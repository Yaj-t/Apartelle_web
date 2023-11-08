import React from 'react'
import './styles/footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <div>
        <div className='footer-container'>
            <div className='content-container'>
                <div className='about'>
                    <h1> LOGO </h1>
                    <p> Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.  </p>
                    <button> <FacebookIcon /> Facebook </button>
                </div>

                <div className='link-container'>
                    <div className='info-container'>
                        <h2> COMPANY </h2>
                        <ul>
                            <li>About Us</li>
                            <li>Legal Information</li>
                            <li>Contact Us</li>
                            <li>Blogs</li>
                        </ul>
                    </div>

                    <div className='info-container'>
                        <h2> HELP CENTER </h2>
                        <ul>
                            <li>Find a Room</li>
                            <li>How to Host?</li>
                            <li>Why Us?</li>
                            <li>FAQs</li>
                            <li>Rental Guides</li>
                        </ul>
                    </div>

                    <div className='info-container'>
                        <h2> CONTACT INFO </h2>
                        <ul>
                            <li>Phone: 1234567890</li>
                            <li>Email: company@gmail.com</li>
                            <li>Location: Cantagay, Jagna, Bohol</li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr />

            <div className='copyright-container'>
                <p> <CopyrightIcon /> 2022 thecreation.design | All rights raserved</p>
                <p> Created with love by thecreation.design </p>
            </div>
        </div>
    </div>
  )
}

export default Footer
