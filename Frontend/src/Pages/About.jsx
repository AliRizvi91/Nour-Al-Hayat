import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";


// Components
import Navbar from '../Components/Navbar';
import MButton from "../Components/MButton";
import Footer from "../Components/Footer";
// CSS Files
import "../CSS/About/About.css"
import "react-lazy-load-image-component/src/effects/blur.css"

function About() {
  
  const navigate = useNavigate()
  const goSignUp = ()=>{
    navigate('/signup')
  }

  return (
    <>
    <div className='container-fluid text-center AboutContainer p-0 m-0'>
        <Navbar/>
        <div className='d-flex flex-column justify-content-center align-items-center h-100 mt-5' >
                <h1 className='Script lightOrange' style={{fontSize:"5.5rem"}}>About Us</h1>
                <p style={{width:"22rem"}} id='ATText'>---------------Discover the perfect blend of comfort and elegance at Nour Al-Hayat, where every stay feels like home.
                Enjoy our warm hospitality, luxurious amenities, and a tranquil atmosphere that will make your visit truly unforgettable.---------------</p>
                
        <div style={{ width: "30rem", height: "2px" }} className='mt-5 mb-2 line'></div>
        </div>
        
        <div className='BContainer d-flex justify-content-between align-items-center mt-3 mb-5 my-5'>
            {/* Block1 */}
            <div className='text-start Block1 ms-5 my-5'>
                <h2 className='Roman'>Nour Al-Hayat:- <br /> Your Serene Escape Awaits</h2>
                
                     <p>At Nour Al-Hayat, we invite you to experience a sanctuary of tranquility and warmth.
                         Nestled in a vibrant locale, our hotel combines luxurious accommodations with heartfelt hospitality.
                          Each room is thoughtfully designed to provide you with the perfect retreat after a day of exploration.
                           Enjoy our exceptional amenities, indulge in delectable cuisine, and immerse yourself in the local culture.
                            Whether you're here for a romantic getaway, a family vacation, or a business trip,
                         Nour Al-Hayat is your gateway to an unforgettable stay. Come and discover the essence of life at Nour Al-Hayat, where comfort meets elegance.</p>
                         
                         <MButton text='Sign Up For Free' onClick={goSignUp} />
                         <h4 className='Script mb-0 mt-3 lightOrange'>Nour Al Hayat, where dreams align,</h4>
                         <h4 className='Script mb-0 lightOrange'>A haven of peace, your heart will find.</h4>
                         <h4 className='Script mb-0 lightOrange'>Warmth in each corner, comfort in sight,</h4>
                         <h4 className='Script mb-0 lightOrange'>A refuge of joy, a beacon of light.</h4>
            </div>

            {/* Block2 */}
            <div className='me-5 my-5 Block2'>
                {/* <img src="/assets/images/About1Img.png" className='About1Img' alt="Error" /> */}
                <LazyLoadImage effect="blur" src="/assets/images/About1Img.png" className='About1Img'alt="Scroll to top" />
            </div>
        </div>
        
    </div>
        <Footer />
    </>
  )
}

export default About
