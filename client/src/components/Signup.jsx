import React from 'react';
import Card from '@mui/material/Card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SignUpCSS from '../styles/signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
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
  let navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values)
      const response = await axios.post('http://localhost:3001/auth/signup', values);
      console.log('Server response:', response.data);
      resetForm();

      let url = '/login'
      console.log(url);
      navigate(url);
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
              { formik => (
                <Form>
                  <div className={SignUpCSS.signupForm}>
                    <div className={SignUpCSS.signupInputContainer}>
                      <div className={SignUpCSS.signupInput}>
                        <div>
                          <Field type="text" name="firstName" placeholder="First Name" className={formik.errors.firstName ? SignUpCSS.errorInput : ''}/>
                          {formik.errors.firstName ? <div className={SignUpCSS.error}> {formik.errors.firstName} </div> : null}
                        </div>

                        <div>
                          <Field type="text" name="lastName" placeholder="Last Name" className={formik.errors.lastName ? SignUpCSS.errorInput : ''}/>
                          {formik.errors.lastName ? <div className={SignUpCSS.error}> {formik.errors.lastName} </div> : null}
                        </div>
                      </div>

                      <div className={SignUpCSS.signupInput}>
                        <div>
                          <Field type="number" name="contactNumber" placeholder="Contact Number" className={formik.errors.contactNumber ? SignUpCSS.errorInput : ''}/>
                          {formik.errors.contactNumber ? <div className={SignUpCSS.error}> {formik.errors.contactNumber} </div> : null}
                        </div>

                        <div>
                          <Field type="email" name="email" placeholder="Email" className={formik.errors.email ? SignUpCSS.errorInput : ''}/>
                          {formik.errors.email ? <div className={SignUpCSS.error}> {formik.errors.email} </div> : null}
                        </div>
                      </div>

                      <div className={SignUpCSS.signupInputPassword}>
                        <div>
                          <Field type="password" name="password" placeholder="Password" className={formik.errors.password ? SignUpCSS.errorInput : ''}/>
                          {formik.errors.password ? <div className={SignUpCSS.error}> {formik.errors.password} </div> : null}
                        </div>

                        <div>
                          <Field type="password" name="confirmPassword" placeholder="Confirm Password" className={formik.errors.confirmPassword ? SignUpCSS.errorInput : ''}/>
                          {formik.errors.confirmPassword ? <div className={SignUpCSS.error}> {formik.errors.confirmPassword} </div> : null}

                        </div>
                      </div>
                    </div>

                    <div className={SignUpCSS.signupButtonContainer}>
                      <button type="submit" id={SignUpCSS.signupButton}>
                        SIGNUP
                      </button>
                    </div>
                  </div>
                </Form>
              )}
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
