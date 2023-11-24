import React, { useState } from 'react';
import { Card } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import loginCSS from '../styles/login.module.css';
import { Link } from 'react-router-dom';

function Login(){
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
        <Link to='/'>
            <div className={loginCSS.backHome}>
                <ArrowBackIosNewIcon fontSize='very small'/>
                <p> Back to Home  </p> 
            </div>
        </Link>

        <div className={loginCSS.loginContainer}>
            <Card>
                <div className={loginCSS.loginFormContainer}>
                    <div className={loginCSS.loginHeader}>
                        <h1>LOG IN</h1>
                    </div>

                    <form>
                        <div className={loginCSS.loginForm}>
                            <div className={loginCSS.loginInputContainer}>
                                <div className={loginCSS.loginInput}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" name="username" placeholder="Type your username" required />
                                </div>

                                <div className={loginCSS.loginInput}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" placeholder="Type your password" required />
                                </div>
                            </div>
                        </div>

                        <div className={loginCSS.loginInput}>
                            <Link to='/' className={loginCSS.forPass}>Forgot Password?</Link>
                            <Link to='/'> <input type="button" value="LOGIN"/> </Link>
                        </div>
                    </form>

                    <div className={loginCSS.goToSignUp}>
                        <p>Don’t have an account?</p> 
                        <Link to='/signup' className="signup-link"><strong>SIGN-UP</strong></Link>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
};

export default Login


