import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/user/myprofile/', {
          headers: { accessToken: sessionStorage.getItem('accessToken') },
        });
        const profileData = response.data.user;
        setProfile(profileData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Profile Information</h2>
      <p>
        <b>ID:</b> {profile.id}
      </p>
      <p>
        <b>First Name:</b> {profile.firstName}
      </p>
      <p>
        <b>Last Name:</b> {profile.lastName}
      </p>
      <p>
        <b>Email:</b> {profile.email}
      </p>
      <p>
        <b>User Type:</b> {profile.userType}
      </p>
      <p>
        <b>Contact Number:</b> {profile.contactNumber}
      </p>
      <Link to="/myProfile/update">Edit Profile</Link>
    </div>
  );
};

export default ProfilePage;
