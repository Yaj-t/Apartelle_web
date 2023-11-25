import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Card from '@mui/material/Card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import loginCSS from '../styles/login.module.css';
import { Link } from 'react-router-dom';

// Validation schema using Yup
const LoginSchema = yup.object().shape({
  email: yup.string().required('email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:3001/auth/login', values)
      .then((response) => {
        console.log('Login successful:', response.data);
        // Handle successful login here
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login failure here
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <Link to="/">
        <div className={loginCSS.backHome}>
          <ArrowBackIosNewIcon fontSize="very small" />
          <p>Back to Home</p>
        </div>
      </Link>

      <div className={loginCSS.loginContainer}>
        <Card>
          <div className={loginCSS.loginFormContainer}>
            <div className={loginCSS.loginHeader}>
              <h1>LOG IN</h1>
            </div>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, isSubmitting }) => (
                <Form>
                  <div className={loginCSS.loginForm}>
                    <div className={loginCSS.loginInputContainer}>
                      <div className={loginCSS.loginInput}>
                        <label htmlFor="email">Email</label>
                        <Field type="text" id="email" name="email" />
                        <ErrorMessage className={loginCSS.error} component="div" name="email" />
                      </div>

                      <div className={loginCSS.loginInput}>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage className={loginCSS.error} component="div" name="password" />
                      </div>
                    </div>

                    <div className={loginCSS.loginInput}>
                      <Link to="/" className={loginCSS.forPass}>
                        Forgot Password?
                      </Link>
                      <button type="submit" disabled={!isValid || isSubmitting}>LOGIN</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className={loginCSS.goToSignUp}>
              <p>Don't have an account?</p>
              <Link to="/signup">
                <strong>SIGN-UP</strong>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
