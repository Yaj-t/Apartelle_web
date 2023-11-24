import React, { useState } from 'react'
import Card from '@mui/material/Card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SignUpCSS from '../styles/signup.module.css'
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server or perform validation)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
        <Link to='/'>
            <div className={SignUpCSS.backHome}>
                <ArrowBackIosNewIcon fontSize='very small'/>
                <p> Back to Home  </p> 
            </div>
        </Link>

      <div className={SignUpCSS.signupContainer}>
        <Card>
          <div className={SignUpCSS.signupFormContainer}>
            <div className={SignUpCSS.signupHeader }>
              <h1>SIGN UP</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={SignUpCSS.signupForm}>
                <div className={SignUpCSS.signupInputContainer}>
                  <div className={SignUpCSS.signupInput}>
                    <div>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    </div>
                  </div>
                  

                  <div className={SignUpCSS.signupInput}>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactNumber">Contact Number</label>
                      <input
                        type="number"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                  </div>

                  <div className={SignUpCSS.signupInputContainer}>
                    <div className={SignUpCSS.signupInputPassword}>
                      <div>
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>


                      <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Link to='/'>
                  <div className={SignUpCSS.signupInput}>
                    <input type="button" value="SIGNUP" />
                  </div>
                </Link>
              </div>
              
            </form>
              
            <div className={SignUpCSS.goToLogIn}>
              <p> Already have an account? </p>
              <Link to='/login'>
                <strong>LOG IN</strong>
              </Link>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Signup
