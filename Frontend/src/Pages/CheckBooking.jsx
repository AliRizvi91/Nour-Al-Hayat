import React from 'react';
import Calendar from "../Components/Calendar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import '../CSS/CheckBooking/CheckBooking.css'; // Import your CSS file

// icons
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';

function CheckBooking() {
  return (
    <>
        {/* Custom Navbar */}
        <div className="container-fluid text-center d-flex flex-row justify-content-center align-items-center">
            <Link to='/checkbooking'>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <InsertInvitationRoundedIcon className='icons' />
            <h4 className='Roman mx-3 my-4'>Flexible Dates</h4>
          </div>
            </Link>
          <hr style={{ border: "2px solid white", height: "3rem" }} />
            <Link to='/rooms'>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <h4 className='Roman mx-3 my-4'>Rooms & rates</h4>
            <BedroomChildRoundedIcon className='icons' />
          </div>
            </Link>
        </div>

    
    {/* Page Start */}


    <div className="check-booking-container container-fluid">
    <div className='Script pt-2 CBHeading mb-0' style={{fontSize:"6.5rem"}}>Flexible Dates</div>
      <Calendar />
    </div>
    <Footer/>
    </>
  );
}

export default CheckBooking;
