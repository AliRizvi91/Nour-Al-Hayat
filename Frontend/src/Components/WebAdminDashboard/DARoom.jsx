import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "../../CSS/SignUp/SignUp.css";
import "../../CSS/WebAdminDashboard/Admin.css";
import ImageUploader from "../ImageUploader";
import MButton from "../MButton";
import DASCard from "../WebAdminDashboard/DASCard";
import LivingIcon from '@mui/icons-material/Living';
// RTK
import { postRoom, getAllRoom, DeleteRoom, updateRoom } from "../../RTK/Thunks/RoomThunks";

function DARoom() {
  const [RoomState, setRoomState] = useState({
    roomType: '',
    description: '',
    facilities: '',
    roomNumber: 0,
    price: '',
    capacity: '',
    squareMeter: '',
    bedrooms: '',
    bathrooms: '',
  });
  
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null); // Track the room ID for updates
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.roomStore);

  const handleImageSelect = useCallback((file) => {
    setImage(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(RoomState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append('roomImage', image);
      }

      const resultAction = await dispatch(postRoom({ formData }));

      if (postRoom.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        setRoomState({
          roomType: '',
          description: '',
          facilities: '',
          roomNumber: 0,
          price: '',
          capacity: '',
          squareMeter: '',
          bedrooms: '',
          bathrooms: '',
        });
        toast.success('Room created successfully');
      } else {
        toast.error('Failed to create room');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error creating room:', error);
      toast.error('Failed to create room');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleDelete = useCallback((id) => {
    try {
      dispatch(DeleteRoom({ _id: id }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      dispatch(getAllRoom());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleURData = (id) => {
    const FindRoom = rooms.find((Room) => Room._id === id);
    if (FindRoom) {
      setRoomState({
        roomType: FindRoom?.roomType || '',
        description: FindRoom?.description || '',
        facilities: FindRoom?.facilities || '',
        roomNumber: FindRoom?.roomNumber || 0,
        price: FindRoom?.price || '',
        capacity: FindRoom?.capacity || '',
        squareMeter: FindRoom?.squareMeter || '',
        bedrooms: FindRoom?.bedrooms || '',
        bathrooms: FindRoom?.bathrooms || '',
      });
      setShow(true);
      setCurrentRoomId(id); // Set the current room id for update
      setImage(FindRoom?.roomImage)
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentRoomId) return; // Ensure there's a room ID to update

    try {
      const formData = new FormData();
      Object.entries(RoomState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append('roomImage', image);
      }

      const resultAction = await dispatch(updateRoom({ Id: currentRoomId, formData }));

      if (updateRoom.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        setRoomState({
          roomType: '',
          description: '',
          facilities: '',
          roomNumber: 0,
          price: '',
          capacity: '',
          squareMeter: '',
          bedrooms: '',
          bathrooms: '',
        });
        toast.success('Room updated successfully');
      } else {
        toast.error('Failed to update room');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error updating room:', error);
      toast.error('Failed to update room');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomState((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <h3 className='pt-5'>...Loading</h3>;
  }

  return (
    <>
      <div className="container-fluid pt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="Script">{show ? 'Update Room' : 'Create Room'}</h1>

        {/* Form */}
        <form className="smSpage DARoomForm position-relative p-4 mb-3 mx-3 d-flex flex-column align-items-center text-center">
          {/* Room Image */}
          <ImageUploader
            originalFilePath={show ? image : null}
            onImageSelect={handleImageSelect}
            Width="16rem"
            Height="9rem"
            BRadius="2px"
          />

          <input
            className="form-control py-2 mt-4 mb-1 text-center"
            type="text"
            name="roomType"
            value={RoomState.roomType}
            onChange={handleChange}
            placeholder="Room Name"
          />
          <textarea
            className="form-control py-2 mb-1 text-center"
            name="description"
            value={RoomState.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
          />
          <input
            className="form-control py-2 mb-1 text-center"
            type="text"
            name="facilities"
            value={RoomState.facilities}
            onChange={handleChange}
            placeholder="Facilities"
          />
          {/* Block 1 */}
          <div className="d-flex align-items-center justify-content-center">
            <input
              className="form-control py-2 me-1 mb-1 text-center"
              type="number"
              name="roomNumber"
              value={RoomState.roomNumber}
              onChange={handleChange}
              placeholder="Room Number"
            />
            <input
              className="form-control py-2 mx-1 mb-1 text-center"
              type="text"
              name="price"
              value={RoomState.price || ''}
              onChange={handleChange}
              placeholder="Price"
            />
            <input
              className="form-control py-2 ms-1 mb-1 text-center"
              type="text"
              name="capacity"
              value={RoomState.capacity}
              onChange={handleChange}
              placeholder="Capacity"
            />
          </div>

          {/* Block 2 */}
          <div className="d-flex align-items-center justify-content-center">
            <input
              className="form-control py-2 me-1 mb-1 text-center"
              type="text"
              name="squareMeter"
              value={RoomState.squareMeter}
              onChange={handleChange}
              placeholder="Square Meter"
            />
            <input
              className="form-control py-2 mx-1 mb-1 text-center"
              type="text"
              name="bedrooms"
              value={RoomState.bedrooms}
              onChange={handleChange}
              placeholder="Beds"
            />
            <input
              className="form-control py-2 ms-1 mb-1 text-center"
              type="text"
              name="bathrooms"
              value={RoomState.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
            />
          </div>

          {show ? (
            <MButton text="Update" onClick={handleUpdate} />
          ) : (
            <MButton text="Submit" onClick={handleSubmit} />
          )}
        </form>

        {/* All Rooms */}
        <div className="container DARoomContainer">
          <h1 className="Script">Rooms</h1>
          {Array.isArray(rooms) && rooms.length > 0 ? (
            rooms.map((Room) => (
              <DASCard
                key={Room._id}
                Icons={<LivingIcon className='icons DASIcon' />}
                ID={Room._id}
                Name={Room.roomType}
                RNumber={`Room No: ${Room.roomNumber}`}
                Para={Room.description}
                Delete={() => handleDelete(Room._id)}
                Edit={() => handleURData(Room._id)}
              />
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DARoom;
