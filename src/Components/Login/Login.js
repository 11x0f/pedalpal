import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const generateOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(generatedOtp);
    console.log('OTP sent to', phoneNumber, 'is:', generatedOtp);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log('Entered OTP:', otp);
    // Perform OTP validation here

    // Assuming OTP validation is successful, create a session token
    const sessionToken = generateSessionToken();
  
    // Store the session token in session storage
    console.log(phoneNumber);
    if(phoneNumber!=null || phoneNumber===" ")
      {
        sessionStorage.setItem('phoneNumber', phoneNumber);

    // Redirect the user to the home page
      navigate('/home');
      }
  };

  const generateSessionToken = () => {
    // Generate a random session token here
    // You can use a library like uuid to generate a unique session token
    const sessionToken = 'example_session_token';

    return sessionToken;
  };

  const phonenum = sessionStorage.getItem("phoneNumber");


  useEffect( ()=>{
      if(phonenum != null)
  {
      navigate("/home");
      
      return ;
  }
  },[])

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLoginFormSubmit}>
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} required />
          </label>
          <button type="button" onClick={generateOtp}>Generate OTP</button>
          <br />
          <label>
            OTP:
            <input type="text" value={otp} onChange={(event) => setOtp(event.target.value)}  required />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
