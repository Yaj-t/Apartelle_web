import React from 'react';
import NavBarDashboard from '../../NavBars/NavBarDashboard';
import Card from '@mui/material/Card';
import ReserveDetailsCSS from '../../../styles/admin/ReservationDetails.module.css';

function ReservationDetails() {
  return (
    <div>
      <div className={ReserveDetailsCSS.ReserveDetailsContainer}>
        <NavBarDashboard />
        <div className={ReserveDetailsCSS.cardContainer}>
          <Card>
            <div className={ReserveDetailsCSS.contentContainer}>
              <img
                src='../../src/assets/Room_Picture.jpg'
                alt='room picture'
                id={ReserveDetailsCSS.reserveImg}
              />
              <div className={ReserveDetailsCSS.bodyContent}>
                <div className={ReserveDetailsCSS.titleHeader}>
                  <h1>Room Type</h1>
                  <h3>Room Number</h3>
                </div>

                <div className={ReserveDetailsCSS.details}>
                  <p>
                    <b> Name of Client: </b> Marc Nelson Ochavo
                  </p>
                  <p>
                    <b> No. of Adults: </b> 2
                  </p>
                  <p>
                    <b> No. of Children: </b> 3
                  </p>
                  <p>
                    <b> Reserved Day: </b> 11/23/23
                  </p>
                  <p>
                    <b> Check-out Day: </b> 12/23/23
                  </p>
                  <p>
                    <b> Payment: </b> Php 1,000.00
                  </p>
                  <p>
                    <b> Duration: </b> 2 Days
                  </p>
                </div>
              </div>
            </div>

            <div className={ReserveDetailsCSS.buttonContainer}>
              <button> Not Checked-In </button>
              <button> Cancel Reservation </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails;
