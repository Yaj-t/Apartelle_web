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
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

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

  const handleDeleteAccountClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await Axios.delete("http://localhost:3001/user/myprofile", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      });
      sessionStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
            <div className={UserCSS.userInfoDetails}>
              <div className={UserCSS.userInfoHeader}>
                <h1>
                  Hello, {profile.firstName} {profile.lastName}
                </h1>
              </div>

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
                </div>
              </div>
            </div>
          </div>
          <div id={UserCSS.editProfile}>
            <button onClick={handleEditProfileClick}>Edit Profile</button>
            {showEditModal && (
              <EditProfileForm handleCloseModal={handleCloseModal} />
            )}
          </div>
          <div id={UserCSS.deleteAccount}>
            <button onClick={handleDeleteAccountClick}>Delete Account</button>

            {showDeleteModal && (
              <div className={UserCSS.modalBackground}>
                <div className={UserCSS.modalContent}>
                  <span
                    className={UserCSS.close}
                    onClick={handleCloseDeleteModal}
                  >
                    &times;
                  </span>
                  <div>
                    <h2>Are you sure you want to delete your account?</h2>
                    <p>This change is permanent and cannot be undone.</p>
                    <div className={UserCSS.twoButtons}>
                      <button onClick={handleConfirmDelete}>Yes</button>
                      <button onClick={handleCloseDeleteModal}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
