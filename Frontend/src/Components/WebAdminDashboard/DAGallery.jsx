import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "../../CSS/SignUp/Signup.css";
import "../../CSS/WebAdminDashboard/Admin.css";
import ImageUploader from "../ImageUploader";
import MButton from "../MButton";
import {NavLink} from 'react-router-dom'
// Icons
import DeleteIcon from '@mui/icons-material/Delete';
// RTK
import {getAllGallery,postGallery,DeleteGallery,updateGallery} from "../../RTK/Thunks/GalleryThunks";
import {getAllHotel} from '../../RTK/Thunks/HotelThunks'

function DAGallery() {


  const [image, setimage] = useState(null);
  const [show, setShow] = useState(false);
  const [currentGalleryId, setCurrentGalleryId] = useState(null); // Track the Gallery ID for updates
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.galleryStore);
  const { hotel } = useSelector((state) => state.HotelStore);

  // Image Select Handlers
  const handleimageSelect = useCallback((file) => setimage(file), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
  
      if (image) formData.append('image', image);
      formData.append('hotelId', hotel._id)

      

      const resultAction = await dispatch(postGallery({ formData}));

      if (postGallery.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        // Reset states
        setimage(null);
        toast.success('Gallery created successfully');
      } else {
        toast.error('Failed to create Gallery');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error creating Gallery:', error);
      toast.error('Failed to create Gallery');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleDelete = useCallback((id) => {
    try {
      dispatch(DeleteGallery({ _id: id }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  //-------- AllHotel ----------
  useEffect(() => {
    try {
      dispatch(getAllHotel());
      dispatch(getAllGallery());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);


  

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentGalleryId) return; // Ensure there's a Gallery ID to update

    try {
      const formData = new FormData();
      Object.entries(GalleryState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) formData.append('GalleryImages', image);

      // Log FormData contents
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      

      const resultAction = await dispatch(updateGallery({ Id: currentGalleryId, formData }));

      if (updateGallery.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        // Reset states
        setimage(null);
        setGalleryState({
          hotelId: hotel._id,
        });
        toast.success('Gallery updated successfully');
      } else {
        toast.error('Failed to update Gallery');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error updating Gallery:', error);
      toast.error('Failed to update Gallery');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };


  if (loading) {
    return <h3 className='pt-5'>...Loading</h3>;
  }

  return (
    <>
      <div className="container-fluid pt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="Script">{show ? 'Update Gallery' : 'Create Gallery'}</h1>

        {/* Form */}
        <form className="smSpage w-100 DAGalleryForm position-relative p-4 mb-3 mx-3 d-flex flex-column align-items-center text-center">
          {/* Gallery Image */}
          <div className="d-flex mb-1">
            <ImageUploader
              originalFilePath={show ? image : null}
              onImageSelect={handleimageSelect}
              Width="17rem"
              Height="13rem"
              BRadius="2px"
            />
          </div>


          {show ? (
            <MButton text="Update" onClick={handleUpdate} />
          ) : (
            <MButton text="Submit" onClick={handleSubmit} />
          )}
        </form>

        {/* All items */}
        <div className="container DARoomContainer">
          <h4 className="Roman lightOrange">Gallery Package</h4>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((Photo) => (
              <div key={Photo._id} className="container-fluid DAGalleryContainer d-flex align-items-center w-100 my-1 p-1" style={{height:"auto"}}>
                <NavLink to={Photo.image} target='_blank'>
                <img src={Photo.image} alt="Error" style={{width:"3.5rem",height:"auto"}} />
                </NavLink>
                <div className='w-100'>
                <strong className='Roman'>{Photo.hotelId?.name}</strong>
                </div>
                <p id='RCPara' className='mb-0'>{Photo.hotelId?.description}</p>
                <button className='button' onClick={()=> handleDelete(Photo._id)}>
                <DeleteIcon className='icons mx-1' />
                </button>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
          
          </div>
        </div>
    </>
  );
}

export default DAGallery;
