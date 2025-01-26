import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { useLocation , useNavigate, Link} from 'react-router-dom';
import "../CSS/RoomsPage/Rooms.css";

// icons
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import LocalGroceryStoreSharpIcon from '@mui/icons-material/LocalGroceryStoreSharp';

// Redux Toolkit
import { getAllRoom  } from "../RTK/Thunks/RoomThunks";
// components
import RoomCard from "../Components/RoomCard";
import Footer from "../Components/Footer";

function Rooms() { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {totalQuantity, rooms, loading, error } = useSelector((state) => state.roomStore);
  const location = useLocation();

  // State for guest number and filtered rooms
  const [guestCount, setGuestCount] = useState(0);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Extract query parameters
  const query = new URLSearchParams(location.search);
  const entranceDate = query.get('entrance');
  const departureDate = query.get('departure');
  const dateCount = query.get('dateCount');
  const safeDateCount = dateCount ? Number(dateCount) : 0;

  

  const formattedDates = entranceDate && departureDate
  ? `${new Date(entranceDate).toISOString().split('T')[0]} / ${new Date(departureDate).toISOString().split('T')[0]}`
  : '';

  useEffect(() => {
    const fetchAllRooms = async() => {
      try {
        await dispatch(getAllRoom());
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRooms();
  }, [dispatch]);

  // Effect to update filteredRooms when rooms are fetched
  useEffect(() => {
    if (rooms.length > 0) {
      setFilteredRooms(rooms);
    }
  }, [rooms]); 

  // Handle loading and error states
  if (loading) {
    return <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
  }
  if (error) return <div>Error fetching rooms: {error.message}</div>;

  // Function to handle search
  const handleSearch = () => {
    const updatedRooms = rooms.filter(room => room.capacity >= guestCount);
    setFilteredRooms(updatedRooms);
  };





  return (
    <>
        {/* Custom Navbar */}
        <div className="container-fluid text-center d-flex flex-row justify-content-center align-items-center">
            <Link to='/checkbooking'>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <InsertInvitationRoundedIcon className='icons' />
            <h4 className='Roman mx-3 my-4'>Flexible Dates</h4>
          </div>
            </Link>
          <hr style={{ border: "2px solid white", height: "3rem" }} />
            <Link to='/rooms'>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <h4 className='Roman mx-3 my-4'>Rooms & rates</h4>
            <BedroomChildRoundedIcon className='icons' />
          </div>
            </Link>



        
        <Link to="/bookStore">
        <div id='StoreBlock' style={{position:"absolute" , right:"1.1rem"}}>
          <div className='Scircle d-flex justify-content-center align-items-center'><strong>{totalQuantity}</strong></div>
          <Button variant="primary" id="storeIcon">
            <LocalGroceryStoreSharpIcon className='icons offIcon'/>
          </Button>
        </div>
        </Link>
      </div>

      {/* Page Start */}
      <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center p-0">
        <div className="container-fluid RVideo m-0 p-0">
          <video 
            src="/assets/videos/RoomBG.mp4" 
            autoPlay 
            loop 
            muted 
            loading="lazy" 
            className="video-background" 
          />
        </div>
        <div className='Script RHead' style={{fontSize:"6.5rem"}}>Rooms & Rates</div>

        {/*-------- Search bar -------- */}
        <div className='searchbar mt-2 text-start d-flex flex-row justify-content-center align-items-center'>
          <div className='mx-2'>
            <p className='mb-1'>Click to Entrance - Departure Dates</p>
            <input 
              className="form-control py-2 mb-1 text-center" 
              type="text"
              value={formattedDates || ''} // Ensure it's always a string
              placeholder="Entrance to Departure Dates"
              readOnly
            />
          </div>

          <div className='mx-2'>
            <p className='mb-1'>Your's Days</p>
            <input 
              className="form-control py-2 mb-1 text-center" 
              type="number"
              value={safeDateCount} // Use safeDateCount
              placeholder="0"
              readOnly
            />
          </div>

          <div className='mx-2'>
            <p className='mb-1'>Guest</p>
            <input 
              className="form-control py-2 mb-1 text-center" 
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              placeholder="Guest"
            />
          </div>
          {/* Btn */}
          <button 
            type="button" 
            className="btn btn-primary RSBTN"
            onClick={handleSearch} // Trigger the search on click
          >
            Refine Search
          </button>
        </div>

        {/* Rooms */}
        <h1 className='Script lightOrange mt-3'>Rooms</h1>
        <p style={{width:"45%"}}>We’re excited to present the various types of rooms available for your selection! Each design has been thoughtfully crafted to enhance your experience and comfort.
           Thank you so much for considering our offerings—we can’t wait to help you find the perfect space for your needs!</p>
        <div className='container-fluid RoomCardC' style={{width:"100%"}}>
        {filteredRooms.map((room) => (
  <RoomCard
  key={room._id}
    Id={room._id} 
    image={room.roomImage}
    price={room.price*dateCount}
    title={room.roomType}
    meter={room.squareMeter}
    bed={room.bedrooms}
    bathroom={room.bathrooms}
    description={room.description}
    RNumber={room.roomNumber}
    entrance={entranceDate}
    departure={departureDate}
    facility={room.facilities}
    Guest={room.capacity}
  />
))

}
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Rooms;
