import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllGallery } from '../../RTK/Thunks/GalleryThunks'; // Adjust the path accordingly
import { LazyLoadImage } from 'react-lazy-load-image-component';
// Css Files
import "react-lazy-load-image-component/src/effects/blur.css"
import '../../CSS/Home/HGallery.css';
// Components
import MButton from "../MButton";

const HGallery = () => { 
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.galleryStore);

  useEffect(() => {
    dispatch(getAllGallery());
  }, [dispatch]);

  if (loading) {
    return <div className="spinner-border text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>; // Show a loading state
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const goGallery = ()=>{
    navigate('/gallery')
  }
  return (
    <>
    <div className="container-fluid text-center">

<h6 className='Roman lightOrange' style={{textTransform:"uppercase"}}>Gallery</h6>
<h1 className='Roman mb-5'>Our Gallery</h1>

<div className="gallery mb-5">
  <div className="gallery-inner">
    {items.map((item, index) => (
      <div className="gallery-item bg-dark m-1" key={index}>
        <LazyLoadImage effect="blur" className="gallery-image" src={item.image} alt={`Image ${index + 1}`} /> {/* Adjust 'url' based on your data structure */}
      </div>
    ))}
  </div>
</div>

</div>
<MButton text='view more' onClick={goGallery} />
    </>
  );
};

export default HGallery;
