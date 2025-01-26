import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "../../CSS/SignUp/SignUp.css";
import "../../CSS/WebAdminDashboard/Admin.css";
import ImageUploader from "../ImageUploader";
import MButton from "../MButton";
import DASCard from "../WebAdminDashboard/DASCard";
import RedeemIcon from '@mui/icons-material/Redeem';
// RTK
import { postGift, DeleteGift, updateGift } from "../../RTK/Thunks/GifDataThunks";
import { getAllUsers } from '../../RTK/Thunks/UserThunk';

function DAGiftData() {
  const [GiftState, setGiftState] = useState({
    description: '',
    price: '',
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [show, setShow] = useState(false);
  const [currentGiftId, setCurrentGiftId] = useState(null); // Track the Gift ID for updates
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.GiftStore);
  const { AllUsers } = useSelector((state) => state.userStore);

  // Image Select Handlers
  const handleImage1Select = useCallback((file) => setImage1(file), []);
  const handleImage2Select = useCallback((file) => setImage2(file), []);
  const handleImage3Select = useCallback((file) => setImage3(file), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(GiftState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image1) formData.append('giftImages', image1);
      if (image2) formData.append('giftImages', image2);
      if (image3) formData.append('giftImages', image3);

      // Log the form data for debugging
      console.log("FormData contents:");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const resultAction = await dispatch(postGift({ formData }));

      if (postGift.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        // Reset states
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setGiftState({
          description: '',
          price: '',
        });
        toast.success('Gift created successfully');
      } else {
        toast.error('Failed to create Gift');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error creating Gift:', error);
      toast.error('Failed to create Gift');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleDelete = useCallback((id) => {
    try {
      dispatch(DeleteGift({ _id: id }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  //-------- AllUsers ----------
  useEffect(() => {
    try {
      dispatch(getAllUsers());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const filterGiftUser = AllUsers.filter((item) => item?.giftStore.length > 0);
  console.log("filterGiftUser", filterGiftUser);
  const GiftPrice = filterGiftUser[0]?.giftStore[0]?.price;
  const userGiftLength = filterGiftUser[0]?.giftStore.length;
  console.log("userGiftLength", userGiftLength);

  const handleURData = (id) => {
    const selectedGift = items.find((gift) => gift._id === id);
    if (selectedGift) {
      setImage1(selectedGift.giftImages[0]);
      setImage2(selectedGift.giftImages[1]);
      setImage3(selectedGift.giftImages[2]);
      setGiftState({
        description: selectedGift.description,
        price: selectedGift.price,
      });
      setShow(true);
      setCurrentGiftId(id); // Set the current Gift id for update
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentGiftId) return; // Ensure there's a Gift ID to update

    try {
      const formData = new FormData();
      Object.entries(GiftState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image1) formData.append('giftImages', image1);
      if (image2) formData.append('giftImages', image2);
      if (image3) formData.append('giftImages', image3);

      // Log FormData contents
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const resultAction = await dispatch(updateGift({ Id: currentGiftId, formData }));

      if (updateGift.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        // Reset states
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setGiftState({
          description: '',
          price: '',
        });
        toast.success('Gift updated successfully');
      } else {
        toast.error('Failed to update Gift');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error updating Gift:', error);
      toast.error('Failed to update Gift');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGiftState((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <h3 className='pt-5'>...Loading</h3>;
  }

  return (
    <>
      <div className="container-fluid pt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="Script">{show ? 'Update Gift' : 'Create Gift'}</h1>

        {/* Form */}
        <form className="smSpage DAGiftForm position-relative p-4 mb-3 mx-3 d-flex flex-column align-items-center text-center">
          {/* Gift Image */}
          <div className="d-flex mb-1">
            <ImageUploader
              originalFilePath={show ? image1 : null}
              onImageSelect={handleImage1Select}
              Width="12rem"
              Height="6rem"
              BRadius="2px"
            />
            <ImageUploader
              originalFilePath={show ? image2 : null}
              onImageSelect={handleImage2Select}
              Width="12rem"
              Height="6rem"
              BRadius="2px"
            />
          </div>
          <div className="d-flex">
            <ImageUploader
              originalFilePath={show ? image3 : null}
              onImageSelect={handleImage3Select}
              Width="12rem"
              Height="6rem"
              BRadius="2px"
            />
          </div>

          <textarea
            className="form-control py-2 mb-1 text-center mt-2"
            name="description"
            value={GiftState.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
          />

          <input
            className="form-control py-2 mx-1 mb-1 text-center"
            type="text"
            name="price"
            value={GiftState.price || ''}
            onChange={handleChange}
            placeholder="Price"
          />

          {show ? (
            <MButton text="Update" onClick={handleUpdate} />
          ) : (
            <MButton text="Submit" onClick={handleSubmit} />
          )}
        </form>

        {/* All items */}
        <div className="container DAGiftContainer">
          <h4 className="Roman lightOrange">Gift Package</h4>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((Gift) => (
              <DASCard
                key={Gift._id}
                Icons={<RedeemIcon className='icons DASIcon' />}
                ID={Gift._id}
                Name={Gift.GiftType}
                RNumber={`Price: ${Gift.price}$ `}
                Para={Gift.description}
                Delete={() => handleDelete(Gift._id)}
                Edit={() => handleURData(Gift._id)}
              />
            ))
          ) : (
            <p>No items available</p>
          )}
          
          <h4 className="Roman lightOrange">Gift Data</h4>
          <div className='container-fluid GiftContainer1 m-0 p-3'>
            <table className="table Roman">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {filterGiftUser.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.giftStore?.length}</td>
                    <td>{Number(item?.giftStore?.length) * Number(GiftPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DAGiftData;
