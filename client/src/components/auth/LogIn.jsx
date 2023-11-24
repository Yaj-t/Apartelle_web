import React, { useState } from 'react';
import '../../styles/auth/styleLogin.css';

const Login = () => {
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
    <div className="signup-container">
      <form>
        <h2>Log In</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" className="input-field" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" className="input-field pass" required />

        <div className="forgot-password">
          <a href="#" className="forgot-link">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">Log in</button>

        <div className="have-account">
          <a href="#" className="signup-link">
            Don’t have an account? <strong>SIGN-UP</strong>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;


