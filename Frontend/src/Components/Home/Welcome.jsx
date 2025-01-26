import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Css Files
import "react-lazy-load-image-component/src/effects/blur.css"
import "../../CSS/Home/Welcome.css"
function Welcome() {
  return (
    <>
      <div className="container-fluid text-center">
    <div className="container-xl borders">
  <div className="row align-items-start justify-content-center">

    <div className="col">
      <LazyLoadImage effect="blur" src="/assets/images/WelImg.png" id='welImg' style={{width:"38rem" , height:"100%"}} alt="Error" />
    </div>
    
    <div className="col">
        <div id='welcome' className='d-flex flex-row justify-content-start align-items-center'>
        <div style={{width:"3rem" ,height:"2px", position:"relative"}} className=' line'></div>
        <div><h6 className='lightOrange'>WELCOME</h6></div>
        </div>

<div className='text-start ' id='welText' style={{width:"32rem"}}>
        <h2 className='Roman'>Join us at Nour Al-Hayat ,where every guest is treated like family and every stay is a cherished memory.</h2>
        <p >Welcome to Nour Al-Hayat, where your comfort and satisfaction are our top priorities.
             Nestled in a serene location, our hotel offers a perfect blend of luxury and warmth.
              From the moment you step through our doors, our dedicated staff is here to ensure you have an unforgettable experience.
               Enjoy elegantly designed rooms, exquisite dining options, and a range of amenities tailored to your needs.
                We invite you to unwind and indulge in the tranquility that Nour Al-Hayat provides.
                 Your stay with us will be a memorable one, filled with the warmth of hospitality.</p>
        <h1 className='Script'>Nour Al-Hayat</h1>
        </div>

    </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Welcome
