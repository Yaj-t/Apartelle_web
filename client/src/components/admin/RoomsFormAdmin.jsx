import React from 'react'
import NavBarDashboard from '../NavBars/NavBarDashboard'
import Card from '@mui/material/Card'
import RoomsFormCSS from '../../styles/admin/roomsFormAdmin.module.css'

function RoomsFormAdmin() {
  return (
    <div>
      <NavBarDashboard />
      <div className={RoomsFormCSS.formContainer}>
        <Card>
          <div className={RoomsFormCSS.cardDetails}>
            <div className={RoomsFormCSS.formHeader}>
              <h1>ADD ROOM</h1>
              <h3>fill up the form below to add a room</h3>
            </div>

            <div className={RoomsFormCSS.formDetails}>
              <form action="">
                <div className={RoomsFormCSS.arrange}>
                  <div className={RoomsFormCSS.formRoom}>
                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="roomType">Room Type</label>
                      <input type="text" />
                    </div>
                    
                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="price">Price</label>
                      <input type="number" />
                    </div>
                    
                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="roomNum">Room Number</label>
                      <input type="number" />
                    </div>
                  </div>

                  <div className={RoomsFormCSS.formRoom}>
                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="max">Max Persons</label>
                      <input type="number" />
                    </div>

                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="adults">Adults</label>
                      <input type="number" />
                    </div>

                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="children">Children</label>
                      <input type="number" />
                    </div>
                  </div>

                  <div className={RoomsFormCSS.formRoom}>
                    <div className={RoomsFormCSS.formInput}>
                      <label htmlFor="amenities">Amenities</label>
                      <input type="text" />
                    </div>
                    <input type="button" value="ADD AMENITIES"/>
                  </div>

                  
                  <div className={RoomsFormCSS.formInputAbout}>
                    <label htmlFor="aboutRoom">Room Description</label>
                    {/* <textarea id="story" name="story" rows="5" cols="33" /> */}
                    <input type="text"/>
                    <input type="button" value="ADD ROOM" />
                  </div>
                </div>
              </form> 
            </div>
          </div>    
        </Card>
      </div>
    </div>
  )
}

export default RoomsFormAdmin
