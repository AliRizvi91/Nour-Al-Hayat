import React,{useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch , useSelector } from "react-redux";
// Css Files
import "react-lazy-load-image-component/src/effects/blur.css"
import "../CSS/Home/Welcome.css"

// Components
import Navbar from '../Components/Navbar';
import ImageSlider from "../Components/Home/ImageSlider";
import Welcome from "../Components/Home/Welcome";
import RoomH from "../Components/Home/RoomH";
import Feedback from "../Components/Home/Feedback";
import HFeatures from "../Components/Home/HFeatures";
import HGallery from "../Components/Home/HGallery";
import HEvents from "../Components/Home/HEvents";
import Footer from "../Components/Footer";
import UserChat from "../Components/Home/UserChat";
// RTK
import { getAllUsers } from "../RTK/Thunks/UserThunk";

function Home() {
  
  const dispatch = useDispatch()
  const {user,AllUsers} = useSelector((state)=> state.userStore)
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (600 / 15); // 500ms for full scroll, 15ms for each step

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    scrollAnimation();
  };
  console.log("Home");
  
  useEffect(()=>{
    try {
      dispatch(getAllUsers())
    } catch (error) {
      console.log(error);
    }
  },[dispatch])

  // Filter Admin 
  const Admin = AllUsers.find((user)=> user.roleId?.name ==="Admin")
  

  return (
    <>
      <Navbar />
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <ImageSlider />

<div className='UserChat'>
        <UserChat AImage={Admin?.image} Admin={Admin} User={user}/>
</div>

        <div style={{ width: "20rem", height: "2px" }} className='my-5 line'></div>
        <Welcome />
        <div style={{ width: "20rem", height: "2px" }} className='my-5 line'></div>
        <RoomH />
        <div style={{ width: "20rem", height: "2px" }} className='mt-5 mb-2 line'></div>
        <Feedback />
        <div style={{ width: "20rem", height: "2px" }} className='mt-5 mb-2 line'></div>
        <HFeatures />
        <div style={{ width: "20rem", height: "2px" }} className='mt-5 mb-2 line'></div>
        <HGallery />
        <div style={{ width: "20rem", height: "2px" }} className='mt-5 mb-2 line'></div>
        <HEvents />
        <div className='mt-5 mb-4' onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <LazyLoadImage effect="blur" src="/assets/images/Up.png" className='UPImg' style={{ width: "6.5rem" }} alt="Scroll to top" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
