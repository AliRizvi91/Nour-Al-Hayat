import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {  useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// RTK Files

// CSS Files
import "../CSS/SignUp/Signup.css";
// Component Files
import MButton from "../Components/MButton";

function SignIn() {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // Retrieve email from navigation state
    
  
    const handleChange =useCallback( (e) => {
      const { value } = e.target;
      setOtp(value);
    })
  
    const handleSubmit = useCallback( async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/user/verifyotp`, { enteredOtp: otp, email });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          // navigate('/');
          window.location.href = '/';
          toast.success('Valid OTP.');
          const success = new Audio('/assets/sounds/success.mp3'); // Adjust the path as necessary
        success.play();
        } else {
          toast.error('Invalid OTP.');
          const Error = new Audio('/assets/sounds/error.mp3'); // Adjust the path as necessary
        Error.play();
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Error verifying OTP. Please try again.');
        const Error = new Audio('/assets/sounds/error.mp3'); // Adjust the path as necessary
        Error.play();
      }
    })
  return (
    <>  
      <div className="container-fluid mainContainer d-flex justify-content-center align-items-center">
      <form className='smSpage position-relative p-4 mx-3 d-flex flex-column align-items-center text-center' onSubmit={handleSubmit}>
        <h1 className='Script'>Otp Verification</h1>

        
                
        <input 
          className="form-control otpInput py-3 my-4  text-center" 
          type="text"
          name="otp"
          value={otp}
          onChange={handleChange}
          maxLength="6"
          placeholder="Enter 6-digit OTP"
        />
               


        <MButton type='submit' text='Verify OTP' />

        
      </form>
    </div>
    </>

  );
}

export default SignIn;
