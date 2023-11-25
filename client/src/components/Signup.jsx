import React from 'react';
import Card from '@mui/material/Card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SignUpCSS from '../styles/signup.module.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
    .required('Confirm Password is required'),
});

function Signup() {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values)
      const response = await axios.post('http://localhost:3001/auth/signup', values);
      console.log('Server response:', response.data);
      resetForm();
    } catch (error) {
      console.error('There was an error submitting the form:', error.message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Link to="/">
        <div className={SignUpCSS.backHome}>
          <ArrowBackIosNewIcon fontSize="small" />
          <p>Back to Home</p>
        </div>
      </Link>

      <div className={SignUpCSS.signupContainer}>
        <Card>
          <div className={SignUpCSS.signupFormContainer}>
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
                confirmPassword: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
                <Form>
                  <div className={SignUpCSS.signupForm}>
                    <div className={SignUpCSS.signupInputContainer}>
                      <div className={SignUpCSS.signupInput}>
                        <Field type="text" name="firstName" placeholder="First Name" />
                        <ErrorMessage name="firstName" component="div" />

                        <Field type="text" name="lastName" placeholder="Last Name" />
                        <ErrorMessage name="lastName" component="div" />
                      </div>

                      <div className={SignUpCSS.signupInput}>
                        <Field type="number" name="contactNumber" placeholder="Contact Number" />
                        <ErrorMessage name="contactNumber" component="div" />

                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" />
                      </div>

                      <div className={SignUpCSS.signupInputPassword}>
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" />

                        <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <ErrorMessage name="confirmPassword" component="div" />
                      </div>
                    </div>

                    <button type="submit">
                      SIGNUP
                    </button>
                  </div>
                </Form>
              
            </Formik>

            <div className={SignUpCSS.goToLogIn}>
              <p>Already have an account?</p>
              <Link to="/login">
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
