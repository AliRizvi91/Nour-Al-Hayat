import React from 'react';
import "../CSS/StoreRCard.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { useDispatch } from "react-redux";
import { deleteRoom } from "../RTK/Slices/RoomSlice";

function StoreRCard({ Id, image, RNumber, title, description, price, Entrance, Departure }) {
  const dispatch = useDispatch();

  const entranceDate = Entrance ? `${new Date(Entrance).toDateString()}` : '';
  const departureDate = Departure ? `${new Date(Departure).toDateString()}` : '';

  const handleDelete = () => {
    dispatch(deleteRoom({ Id, room: { price } })); // Pass the room ID and room details
  }

  return (
    <div className="container-xxl mx-2 p-1 StoreRCard d-flex flex-row justify-content-center align-items-center mb-1">
      <LazyLoadImage
        effect="blur"
        className="d-block RcardSImg mx-2 pe-3"
        src={image}
        alt="Midnight Shadow"
      />
      <div className="mx-1 pt-2 text-start d-flex flex-column justify-content-start align-items-start">
        <p className='Roman mb-1'>{`Room Number: ${RNumber}`}</p>
        <h1 className='Script'>{title}</h1>
        <p className="description mb-2">{description}</p>
        <p className='Roman mb-2'><span className='lightOrange'>Entrance date:</span>{` ${entranceDate}`}</p>
        <p className='Roman '><span className='lightOrange'>Departure date:</span>{` ${departureDate}`}</p>
        <div className='d-flex flex-row justify-content-between align-items-center w-100'>
          <h4 className='Roman mb-0'>{`Price: ${price}$`}</h4>
          <DeleteSharpIcon onClick={handleDelete} className='icons delete' />
        </div>
      </div>
    </div>
  );
}

export default StoreRCard;
