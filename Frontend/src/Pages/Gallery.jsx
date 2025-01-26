import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGallery } from '../RTK/Thunks/GalleryThunks';
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Components
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer";
// Css Files
import "react-lazy-load-image-component/src/effects/blur.css";
import "../CSS/Gallery/Gallery.css";

function Gallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.galleryStore);

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return navigate('/page404');
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className='Script Gtitle mb-3 mt-1' style={{ fontSize: "6rem" }}>Gallery</h1>
        <p style={{ width: "80%" }}>
          Welcome to Nour Al-Hayat, where we bring the beauty of attractions to life! Our website showcases
          a stunning gallery that captivates and inspires. With each click, you'll explore a curated collection of breathtaking destinations and experiences.
          We pride ourselves on presenting the finest visuals that not only highlight the allure of these attractions but also evoke a sense of wanderlust.
          Whether you're planning a getaway or simply seeking inspiration, our gallery is designed for you.
          Join us on this visual journey and discover the world through our lens.
          At Nour Al-Hayat, every image tells a story waiting to be explored. Dive in and let your imagination soar!
        </p>

        <h6 className='Roman lightOrange' style={{ textTransform: "uppercase" }}>Thanks For Reading</h6>

        <div className="container-xxl GContainer">
          {items.map((item, index) => (
            <div className="gallery-block bg-dark m-1" key={index}>
              <a href={item.image} target="_blank" rel="noopener noreferrer">
                <LazyLoadImage
                  effect="blur"
                  className="gallery-image"
                  src={item.image}
                  alt={`Image ${index + 1}`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
