import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
// import { Card } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UserNavBar from "../../NavBars/UserNavBar";
import SettingsSidebar from "../../NavBars/SettingsSidebar";
import Footer from "../../Footer";
import UserCSS from "../../../styles/settings/userProfile.module.css";
import EditProfileForm from "./UpdateProfile";

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/user/myprofile/",
          {
            headers: { accessToken: sessionStorage.getItem("accessToken") },
          }
        );
        const profileData = response.data.user;
        setProfile(profileData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfileClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <UserNavBar />

      <div className={UserCSS.profileContainer}>
        <SettingsSidebar />

        <div className={UserCSS.userDetails}>
          <div className={UserCSS.userHeader}>
            <h1>Profile Details</h1>
            <h2>Update your personal information</h2>
          </div>

          <div className={UserCSS.userInfoContainer}>
            {/* <div className={UserCSS.photoDetails}>
              <Card className={UserCSS.userPhotoCard}>
                <div className={UserCSS.userPhoto}>
                  <AccountCircleIcon id={UserCSS.userPhotoIcon} />
                  <h4>Upload Photo</h4>
                </div>
              </Card>

              <div id={UserCSS.editProfile}>
                <Link to="update">
                  <button>Edit Profile</button>
                </Link>
              </div>
            </div> */}

            <div className={UserCSS.userInfoDetails}>
              <div className={UserCSS.userInfoHeader}>
                <h1>
                  Hello, {profile.firstName} {profile.lastName}
                </h1>
                {/* <p>Joined in </p> */}
              </div>

              {/* <div className={UserCSS.userAddresstoAge}>
                <div className={UserCSS.userContainer}>
                  <h3>Address</h3>
                  <p>Purok 7, Bunga-Mar, Jagna, Bohol</p>
                </div>
              </div> */}

              <div className={UserCSS.userEmailtoPass}>
                <p>
                  <b>Email:</b> {profile.email}
                </p>
                <p>
                  <b>Contact Number:</b> {profile.contactNumber}
                </p>
                <div className={UserCSS.userPassword}>
                  <p>
                    <b> Password: </b>
                  </p>
                  <p>**********</p>
                  {/* <VisibilityIcon />
                  <VisibilityOffIcon /> */}
                </div>
              </div>
            </div>
          </div>
          <div id={UserCSS.editProfile}>
            <button onClick={handleEditProfileClick}>Edit Profile</button>
          </div>
          {showEditModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                <EditProfileForm handleCloseModal={handleCloseModal} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
