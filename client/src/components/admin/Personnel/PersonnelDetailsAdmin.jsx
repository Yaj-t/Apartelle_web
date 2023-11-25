import React from 'react'
import NavBarDashboard from '../../NavBars/NavBarDashboard'
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonnelDetailsCSS from '../../../styles/admin/personnelDetailsAdmin.module.css'

function PersonnelDetailsAdmin() {
  return (
    <div>
      <NavBarDashboard />

      <div className={PersonnelDetailsCSS.detailsContainer}>
         <div className={PersonnelDetailsCSS.cardContainer}>
            <Card>
                <div className={PersonnelDetailsCSS.contentContainer}>
                    <div className={PersonnelDetailsCSS.uploadContainer}>
                        <div className={PersonnelDetailsCSS.uploadPhoto}>
                            <p> <AccountCircleIcon id={PersonnelDetailsCSS.photoIcon}/> </p>
                            <p>Upload a Photo</p>
                        </div>
                    </div>

                    <div className={PersonnelDetailsCSS.bodyContent}>
                        <div className={PersonnelDetailsCSS.details}>
                            <p> <b> Name: </b> Marc Nelson Ochavo</p>
                            <p> <b> Account Type: </b> Administrator</p>
                            <p> <b> Date Joined: </b> 3/20/2023</p>
                            <p> <b> Date of Birth: </b> 3/20/2023 </p>
                            <p> <b> Contact Number: </b> 0917XXXXXXX </p>
                            <p> <b> Email: </b> example@gmail.com</p>
                            <div id={PersonnelDetailsCSS.password}>
                                <p> <b> Password: </b> ●●●●●●●●●●●● </p>
                                <VisibilityIcon/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={PersonnelDetailsCSS.buttonContainer}>
                <button id={PersonnelDetailsCSS.editProfile}> Edit Profile </button>
                <button id={PersonnelDetailsCSS.deleteProfile}> Delete Profile </button>
                </div>
            </Card>
         </div>
      </div>
    </div>
  )
}

export default PersonnelDetailsAdmin
