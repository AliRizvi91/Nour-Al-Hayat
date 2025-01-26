import React from 'react';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import RCardBtn from './RCardBtn.jsx';
import "../CSS/RoomCard.css";
import { toast } from 'react-toastify'; // Import toast
import { addRoom } from '../RTK/Slices/RoomSlice';
import "react-lazy-load-image-component/src/effects/blur.css";
import RoomModal from "../Components/RoomModal.jsx";

function RoomCard({ Id, RNumber, image, price, title, meter, bed, bathroom, description, entrance, departure,facility,Guest }) {
  const dispatch = useDispatch(); // Initialize dispatch
  const bookRooms = useSelector((state) => state.roomStore.bookRooms); // Get booked rooms from the store

  const handleAddRoom = () => {
    console.log(RNumber);
    // Check if the room is already booked
    const isRoomBooked = bookRooms.some(rooms => rooms.Id === Id);

    const Rdata = { Id, RNumber, image, price, title, meter, bed, bathroom, description, entrance, departure,Guest };

    if (isRoomBooked) {
      // Show toast notification if room is already booked
      toast.error('This room is already booked!');
    } else {
      // Dispatch addRoom action if room is not booked
      if (entrance!==null && departure!==null) {
        dispatch(addRoom(Rdata));
        toast.success('Room added to booking!');
      } else {
        toast.info('Please select the Dates');
      }
    }
  };

  return (
    <div className="card mx-4 my-3 RCard text-start" style={{ width: "34rem", borderRadius: "0px", border: "none" }}>
      <a href={image} target="_blank" rel="noopener noreferrer">
        <LazyLoadImage effect="blur" src={image} className='card-img-top w-100 h-100' style={{ borderRadius: "0px" }} alt="Room" />
      </a>
      <div className="card-body Rbody">
        <RCardBtn text={`STARTED AT ${price}$`} position="absolute" top="19rem" onClick={handleAddRoom} />
        <h3 className="card-title Roman">{title}</h3>
        <div className='d-flex flex-row align-items-center'>
          <p className='me-2'>{`${meter} M²`}</p>
          <p className='mx-2'>{`${bed} BEDROOM`}</p>
          <p className='mx-2'>{`${bathroom} BATHROOM`}</p>
        </div>
        <p className="card-text" id='RCardText'>{description}</p>
        {/* ---------Popup--------- */}
        <RoomModal
          class1={'RDetail'}
          BtnText={'Room Detail'}
          Id={Id}
          RNumber={RNumber}
          image={image}
          price={price}
          title={title}
          meter={meter}
          bed={bed}
          bathroom={bathroom}
          description={description}
          entrance={entrance}
          departure={departure}
          facility={facility}
          Guest={Guest}
        />
      </div>
    </div>
  );
}

export default RoomCard;
