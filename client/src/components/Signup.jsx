import React, { useState } from 'react';
import Card from '@mui/material/Card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SignUpCSS from '../styles/signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

function Signup() {
  let navigate = useNavigate();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const response = await axios.post(
        'http://localhost:3001/auth/signup',
        values
      );
      console.log('Server response:', response.data);

      // Shows pop up that sign up is successful
      setSignupSuccess(true);
    } catch (error) {
      console.error('There was an error submitting the form:', error.message);

      // Shows pop up that sign up is not successful
      setSignupError(
        error.response && error.response.status === 409
          ? 'User already exists. Please use a different email or log in.'
          : 'There was an error with the signup. Please try again later.'
      );
    }
    setSubmitting(false);
  };

  const handleSuccessfulAlertClose = () => {
    //close the alert component
    setSignupSuccess(false);

    // Navigate to another module
    let url = '/login';
    console.log(url);
    navigate(url);
  };

  return (
    <div>
      <Link to='/'>
        <div className={SignUpCSS.backHome}>
          <ArrowBackIosNewIcon fontSize='small' />
          <p>Back to Home</p>
        </div>
      </Link>

      <div className={SignUpCSS.signupContainer}>
        <Card>
          <div className={SignUpCSS.signupFormContainer}>
            {/* Conditionally render the Alert component */}
            {signupSuccess && (
              <Alert severity='success' onClose={handleSuccessfulAlertClose}>
                <AlertTitle>Success</AlertTitle>
                Signed Up Successfully —
                <strong>Please go back to Log In!</strong>
              </Alert>
            )}

            {signupError && (
              <Alert severity='error' onClose={() => setSignupError(false)}>
                <AlertTitle>Error</AlertTitle>
                <strong> {signupError} </strong>
              </Alert>
            )}

            <div className={SignUpCSS.signupHeader}>
              <h1>SIGN UP</h1>
            </div>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                contactNumber: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}>
              {formik => (
                <Form>
                  <div className={SignUpCSS.signupForm}>
                    <div className={SignUpCSS.signupInputContainer}>
                      <div className={SignUpCSS.signupInput}>
                        <div>
                          <label htmlFor='firstName'> First Name </label>
                          <Field
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            className={
                              formik.errors.firstName
                                ? SignUpCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.firstName ? (
                            <div className={SignUpCSS.error}>
                              {formik.errors.firstName}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label htmlFor='lastName'> Last Name </label>
                          <Field
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            className={
                              formik.errors.lastName ? SignUpCSS.errorInput : ''
                            }
                          />
                          {formik.errors.lastName ? (
                            <div className={SignUpCSS.error}>
                              {formik.errors.lastName}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label htmlFor='number'> Number </label>
                          <Field
                            type='text'
                            name='contactNumber'
                            placeholder='(09)'
                            maxLength='11'
                            className={
                              formik.errors.contactNumber
                                ? SignUpCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.contactNumber ? (
                            <div className={SignUpCSS.error}>
                              {formik.errors.contactNumber}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label htmlFor='email'> Email </label>
                          <Field
                            type='email'
                            name='email'
                            placeholder='Email'
                            className={
                              formik.errors.email ? SignUpCSS.errorInput : ''
                            }
                          />
                          {formik.errors.email ? (
                            <div className={SignUpCSS.error}>
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label htmlFor='password'> Password </label>
                          <Field
                            type='password'
                            name='password'
                            placeholder='Password'
                            className={
                              formik.errors.password ? SignUpCSS.errorInput : ''
                            }
                          />
                          {formik.errors.password ? (
                            <div className={SignUpCSS.error}>
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label htmlFor='confirmPassword'>
                            Confirm Password
                          </label>
                          <Field
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            className={
                              formik.errors.confirmPassword
                                ? SignUpCSS.errorInput
                                : ''
                            }
                          />
                          {formik.errors.confirmPassword ? (
                            <div className={SignUpCSS.error}>
                              {formik.errors.confirmPassword}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className={SignUpCSS.signupButtonContainer}>
                      <button type='submit' id={SignUpCSS.signupButton}>
                        SIGNUP
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className={SignUpCSS.goToLogIn}>
              <p>Already have an account?</p>
              <Link to='/login'>
                <strong>LOG IN</strong>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
