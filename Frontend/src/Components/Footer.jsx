import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate,Link } from "react-router-dom";
// Components
import MButton from "./MButton";

// CSS File
import "react-lazy-load-image-component/src/effects/blur.css"
import "../CSS/Footer.css";
// Icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  const navigate =useNavigate()
  const handleBook = ()=>{
    navigate('/checkbooking')
  }
  return (
    <>
      <div className="container-fluid Footer px-5">
        <div className="grid-container">
          <div className="grid-item d-flex flex-column justify-content-center align-items-center text-center logo-section">
            
                      <Link className="" to="/">
            <LazyLoadImage effect="blur" className="" style={{ width: "9.5rem" }} src="/assets/images/FooterLogo.png" alt="Logo" />
                      </Link>
            
            <p className="mt-3">
              Welcome to Nour Al-Hayat, your source for nurturing health and wellness.
            </p>
            <ul className="list-inline">
              {[<GoogleIcon className='F-icons' />, <FacebookRoundedIcon className='F-icons' />, <InstagramIcon className='F-icons' />, <YouTubeIcon className='F-icons' />].map((icon, index) => (
                <li className="list-inline-item" key={index}>
                  <a href="#" className="rounded-circle p-2">
                    <div className='FBox d-flex justify-content-center'>{icon}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="F-Col grid-item d-flex flex-column justify-content-center align-items-center text-center">
            <h5 className="text-uppercase"><strong>Pages</strong></h5>
            <ul className="list-unstyled mt-3">
              {/* ['Home', 'About', 'Gallery', 'GiftCard'] */}
                <li >
                  <a href="/" className="text-decoration-none my-4">Home</a>
                </li>
                <li >
                  <a href="/rooms" className="text-decoration-none my-4">Rooms</a>
                </li>
                <li >
                  <a href="/gallery" className="text-decoration-none my-4">Gallery</a>
                </li>
                <li >
                  <a href="/giftcard" className="text-decoration-none my-4">GiftCard</a>
                </li>
              
            </ul>
          </div>

          <div className="F-Col grid-item d-flex flex-column justify-content-center align-items-center text-center">
            <h5 className="text-uppercase"><strong>Help</strong></h5>
            <ul className="list-unstyled mt-3">
              {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-decoration-none my-4">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid-item d-flex flex-column justify-content-center align-items-center text-center">
            <h5 className="text-uppercase"><strong>Book Now</strong></h5>
            <form className="mt-3">
              <div className="mb-3">
                <MButton text='Booking' onClick={handleBook} />
              </div>
              <p>For room bookings, please contact us directly.</p>
            </form>
          </div>
        </div>

        <hr className="my-2" />
      </div>

      <div className="container-fluid last text-center d-flex justify-content-center align-items-center p-4" style={{ height: "2.5rem" }}>
        <div className="d-flex justify-content-center align-items-center">
          <p className='mb-0 '><strong>© Copyright 2024, All Rights Reserved by "Ali Raza Attari"</strong></p>
        </div>
      </div>
    </>
  );
}

export default Footer;
