import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UserNavBar from '../../NavBars/UserNavBar';
import SettingsSidebar from '../../NavBars/SettingsSidebar';
import Footer from '../../Footer';
import UserProfileEditCSS from '../../../styles/settings/userProfileEdit.module.css';

const ProfileEditSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  contactNumber: Yup.string()
    .required('Contact Number is required')
    .min(10, 'Must be at least 10 digits'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .when('password', (password, field) =>
      password != '' ? field.required('Confirm Password is required') : field
    )
});


const EditProfileForm = () => {
  const [profile, setProfile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user profile data
    Axios.get('http://localhost:3001/user/myprofile', {
      headers: { accessToken: sessionStorage.getItem('accessToken') }
    })
      .then(response => {
        setInitialValues({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          contactNumber: response.data.user.contactNumber,
          password: '',
          confirmPassword: ''
        });
      })
      .catch(error => {
        console.error('Error fetching profile data', error);
      });
  }, []);

  const handleSubmit = values => {
    console.log('updating');
    const requestData = {  
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNumber: values.contactNumber,
    };
  
    if (values.password) {
      requestData.password = values.password;
    }
  
    Axios.put('http://localhost:3001/user/myprofile', requestData, {
      headers: { accessToken: sessionStorage.getItem('accessToken') }
    })
      .then(response => {
        console.log('Profile updated successfully');
        navigate('/settings/manage-account/'); // Redirect to the profile page or another appropriate page
      })
      .catch(error => {
        console.error('Error updating profile', error);
      });
  };
  

  return (
    <div>
      <UserNavBar />
      <div className={UserProfileEditCSS.profileContainer}>
        <SettingsSidebar />

        <div className={UserProfileEditCSS.userDetails}>
          <div className={UserProfileEditCSS.userHeader}>
            <h1>Profile Details</h1>
            <h2>Update your personal information</h2>
          </div>


          <Formik
            initialValues={initialValues}
            validationSchema={ProfileEditSchema}
            onSubmit={handleSubmit}
            enableReinitialize // This is important to update the form when initialValues changes
          >
            <Form>
              <Field name='firstName' type='text' placeholder='First Name' />
              <ErrorMessage name='firstName' component='div' />

              <Field name='lastName' type='text' placeholder='Last Name' />
              <ErrorMessage name='lastName' component='div' />

              <Field name='email' type='email' placeholder='Email' />
              <ErrorMessage name='email' component='div' />

              <Field
                name='contactNumber'
                type='text'
                placeholder='Contact Number'
              />
              <ErrorMessage name='contactNumber' component='div' />

              <Field name='password' type='text' placeholder='Password' />
              <ErrorMessage name='password' component='div' />

              <Field
                name='confirmPassword'
                type='text'
                placeholder='Confirm Password'
              />
              <ErrorMessage name='confirmPassword' component='div' />

              <button type='submit'>Update Profile</button>
            </Form>
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfileForm;
