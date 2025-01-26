import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// CSS Files
import "../../CSS/Home/RoomH.css";

// components
import RoomCard from "../RoomCard";
import MButton from "../MButton";

// Redux Toolkit
import { getAllRoom } from "../../RTK/Thunks/RoomThunks";

function RoomH() {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.roomStore);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        await dispatch(getAllRoom());
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRooms();
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <div className="spinner-border text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>; // Show a loading state
  }
  if (error) return <div>Error fetching rooms: {error.message}</div>;

  const goRooms = ()=>{
    navigate('/rooms')
  }

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <h3 className='Script'>Dream Haven</h3>
        <h1 className='Roman lightOrange'>Room/Suits</h1>

        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div id='RRow' className="row justify-content-between align-items-center">
            {rooms.slice(0, 2).map((room, index) => (
              <div className="col" key={index}>
                <RoomCard
                  Id={room._id}
                  RNumber={room.roomNumber}
                  image={room.roomImage}
                  price={room.price}
                  title={room.roomType}
                  meter={room.squareMeter}
                  bed={room.bedrooms}
                  bathroom={room.bathrooms}
                  description={room.description}
                  entrance={null}
                  departure={null}
                  facility={room.facilities}
                  Guest={room.capacity}
                />
              </div>
            ))}
          </div>
        </div>

        <MButton text='view more' onClick={goRooms} />
      </div>
    </>
  );
}

export default RoomH;
