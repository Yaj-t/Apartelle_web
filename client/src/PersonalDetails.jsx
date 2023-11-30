import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./Sidebar";
import "./PersonalDetails.css";

const PersonalDetails = () => {
  const [activeLink, setActiveLink] = useState("Personal Details");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const [name, setName] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("/EmptyProfile.png");
  const [about, setAbout] = useState("This is a default about section.");
  const [address, setAddress] = useState("123, Street Name, City");
  const [dob, setDob] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    setIsChangingPassword(false);
  };

  const handleProfilePicChange = (event) => {
    const newProfilePic = URL.createObjectURL(event.target.files[0]);
    setProfilePic(newProfilePic);
  };

  const handleNameChange = () => {
    const newName = prompt("Enter your new name:");
    if (newName) {
      setName(newName);
    }
  };

  const handleDateOfBirthChange = (key, value) => {
    setDob((prevDob) => ({
      ...prevDob,
      [key]: value,
    }));
  };

  const handleContactNumberChange = (e) => {
    const input = e.target.value;
    const validatedInput = input.replace(/\D/g, "");

    setContactNumber(validatedInput);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setNewEmail(inputEmail);
  };

  const handleChangeEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(newEmail)) {
      setEmail(newEmail);
      setIsChangingEmail(false);
      setNewEmail("");
      alert("Email changed successfully!");
    } else {
      alert("Please enter a valid email address");
    }
  };

  const handlePasswordChange = () => {
    if (!isEditing) {
      alert(
        "To change your password, click 'Edit Profile' and enter a new password."
      );
      return;
    }

    let newPassword = prompt("Enter your new password:");

    if (newPassword !== null) {
      const confirmation = window.confirm(
        "Do you wish to continue changing the password?"
      );

      if (confirmation) {
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
          alert(
            "Password must be at least 8 characters long and contain at least one capital letter."
          );
          return;
        }

        setPassword(newPassword);
        alert("Password changed successfully!");
      } else {
        alert("Password change cancelled.");
      }
    }
  };

  return (
    <div className="personal-details-container">
      <Sidebar />
      <div className="divider-vertical-personal"></div>
      <div className="content-wrapper">
        <h1 className="personal-header">Personal Details</h1>
        <h2 className="personal-subheader">Update your personal information</h2>
        <div className="profile-section">
          <div className="profile-info">
            <div className="details-container">
              <div className="profile-picture-container">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
              <div className="profile-name-container">
                <h1 className="profile-name">
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    name
                  )}
                </h1>
              </div>
              {!isEditing && (
                <div className="edit-buttons">
                  <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
              )}
              {isEditing && (
                <div className="edit-button">
                  <button onClick={handleEditProfile}>Save Profile</button>
                </div>
              )}
              {isEditing ? (
                <input
                  type="file"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                />
              ) : null}
            </div>

            <div className="right-side-content">
              <p className="header-text">About</p>
              <p className="subheader-about">
                {isEditing ? (
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                ) : (
                  about
                )}
              </p>
              <div className="grid-container">
                <div>
                  <p className="header-text">Address</p>
                  <p className="subheader-text">
                    {isEditing ? (
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      address
                    )}
                  </p>
                </div>
                <div>
                  <p className="header-text">Date of Birth</p>
                  <div className="subheader-text">
                    {isEditing ? (
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                      />
                    ) : (
                      <p>{dob ? dob.toLocaleDateString() : "Not specified"}</p>
                    )}
                  </div>
                </div>
              </div>
              <p className="header-text">Contact Number</p>
              <p className="subheader-text">
                {isEditing ? (
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                  />
                ) : (
                  contactNumber
                )}
              </p>
              <p className="header-text">Email</p>
              <p className="subheader-text">
                {isEditing ? (
                  <>
                    {isChangingEmail ? (
                      <>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={handleEmailChange}
                        />
                        <button onClick={handleChangeEmail}>Save Email</button>
                      </>
                    ) : (
                      <>
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          disabled
                        />
                        <div className="edit-buttons">
                          <button onClick={() => setIsChangingEmail(true)}>
                            Change Email
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  email
                )}
              </p>
              <p className="header-text">Password</p>
              <p className="subheader-text">
                {isEditing ? (
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isChangingPassword}
                  />
                ) : (
                  "******"
                )}
              </p>
              {isEditing && (
                <div className="edit-buttons">
                  <button onClick={handlePasswordChange}>
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
