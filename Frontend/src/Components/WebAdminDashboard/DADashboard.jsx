import React ,{useState,useEffect,useCallback}  from 'react'
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'

// CSS Files
import "../../CSS/WebAdminDashboard/DADashboard.css"
// RTK
import { getAllUsers,userUpdate } from "../../RTK/Thunks/UserThunk";
import { getAllRoom } from "../../RTK/Thunks/RoomThunks";
import { getAllBooking } from "../../RTK/Thunks/BookingThunks";
import { getAllEvent } from "../../RTK/Thunks/EventThunks";
import { getAllGallery } from "../../RTK/Thunks/GalleryThunks";
// Charts
import BarChartHasBackground from "../Charts/BarChartHasBackground";
import PieChartWithPaddingAngle from "../Charts/PieChartWithPaddingAngle";
import SimpleAreaChart from "../Charts/SimpleAreaChart";
// icons
import PeopleIcon from '@mui/icons-material/People';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// Components
import ImageUploader from "../ImageUploader";

function DADashboard() {

  
  const [image, setImage] = useState(null);


  const dispatch = useDispatch()
  const {user,AllUsers} = useSelector((state)=> state.userStore) 
  const {rooms} = useSelector((state)=> state.roomStore) 
  const {Bookingitems} = useSelector((state)=> state.BookingStore) 
  const {items} = useSelector((state)=> state.galleryStore) 
  const {eventItems} = useSelector((state)=> state.EventStore) 

  useEffect(()=>{
    dispatch(getAllUsers())
    dispatch(getAllRoom())
    dispatch(getAllBooking())
    dispatch(getAllEvent())
    dispatch(getAllGallery())
  },[dispatch])

  // TotalGifts
  const AllGifts = AllUsers.map((user) => user.giftStore.length);
  const TotalGifts = AllGifts.reduce((acc, elem) => acc + elem, 0);

  // TotalEarning
  const Amounts = Bookingitems.map((booked) => booked.amount);
  const TotalEarning = Amounts.reduce((acc, elem) => Number(acc) + Number(elem), 0);
  
  // PieChartWithPaddingAngle
  const data1 = [
    { name: 'Bookings', value:  Bookingitems.length},
    { name: 'Gifts', value: TotalGifts },
    { name: 'Users', value: AllUsers.length },
  ];

    const handleImageSelect = useCallback((file) => {
      setImage(file);
      
    }, []);

      useEffect(() => {
        if (image) {
          const handleSubmitImage = async () => {
            try {
            const formData = new FormData();
            
            if (image) {
              formData.append('image', image);
              formData.append('id', user?._id);  // Ensure this is passed correctly
            }
            
            
              // Dispatch userUpdate with formData
              const dispatchImage = async()=>{
                dispatch(userUpdate({formData:formData,id:user?._id}));
              }
              await dispatchImage()
              
            } catch (error) {
              console.error('Error Update Image:', error);
              toast.error('Failed to Update Image');
              const errorSound = new Audio('/assets/sounds/error.mp3');
              errorSound.play();
            }
          };
          handleSubmitImage();
        }
      }, [image]);
  

  
  return (
    <>
      <div className="container-fluid mainContainer mt-4 px-5">
      {/*------***----- DATConatiner ------***----- */}
        <div className="container-fluid DATConatiner justify-content-center mx-0 px-0 d-flex">

          <div className="d-flex">
          {/* Box1 */}
          <div className="DBox DBox1 w-100 p-5 mx-3 d-flex justify-content-center align-items-center" >
            <div className='DBTIcon' id='DBIcon1'>
              <PeopleIcon className='icons m-3'/>
            </div>
            <div className=" d-flex flex-column ms-3 mt-3 text-start">
            <strong>{AllUsers.length}</strong>
            <p className='Roman'> Total Users </p>
            </div>
          </div>
          {/* Box2 */}
          <div className="DBox DBox1 w-100 p-5 mx-3 d-flex justify-content-center align-items-center" >
            <div className='DBTIcon' id='DBIcon2'>
              <BookOnlineIcon id='DBTIcon2' className='icons m-3'/>
            </div>
            <div className=" d-flex flex-column ms-3 mt-3 text-start">
            <strong>{Bookingitems.length}</strong>
            <p className='Roman'> Total Booking </p>
            </div>
          </div>
          </div>


          <div className="d-flex">
          {/* Box3 */}
          <div className="DBox DBox1 w-100 p-5 mx-3 d-flex justify-content-center align-items-center" >
            <div className='DBTIcon' id='DBIcon3'>
              <CardGiftcardIcon id='DBTIcon3' className='icons m-3'/>
            </div>
            <div className=" d-flex flex-column ms-3 mt-3 text-start">
            <strong>{TotalGifts}</strong>
            <p className='Roman'> Total Gift </p>
            </div>
          </div>
          {/* Box4 */}
          <div className="DBox DBox1 w-100 p-5 mx-3 d-flex justify-content-center align-items-center" >
            <div className='DBTIcon' id='DBIcon4'>
              <AccountBalanceIcon id='DBTIcon4' className='icons m-3'/>
            </div>
            <div className=" d-flex flex-column ms-3 mt-3 text-start">
            <strong>{`${TotalEarning}$`}</strong>
            <p className='Roman'> Total Earning </p>
            </div>
          </div>
          </div>
        </div>

        {/* DA-Middle-Container */}
        <div className="container-fluid Container1 mx-0 px-0 p-2 d-flex ">

          <div className="container p-3 DAMConatiner text-start me-1">
            <h6 className='lightOrange Roman ms-5'>Bookings  Vs  Gifts</h6>
            <div className='w-100 DAMConatiner1 d-flex justify-content-center align-items-center'>
              {/* Ensure the chart has enough space */}
              {/*-------------------- BarChartHasBackground -------------------- */}
            <div style={{ height: '250px', width: '100%' }} className='mx-2'>
              <BarChartHasBackground />
            </div>
              {/*-------------------- PieChartWithPaddingAngle -------------------- */}
            <div style={{ height: 'auto', width: '25rem' }} className='mx-2 mb-5 PieGraph'>
              <PieChartWithPaddingAngle data={data1} />
            </div>

            </div>
          </div>
{/* Profile Image */}
          <div className='DAMConatiner DAEConatiner p-5 ms-1'>
            
          <ImageUploader originalFilePath={null} onImageSelect={handleImageSelect} DefaultImg={true} BRadius={'50%'} />
            {/* <div className='DAProFileImg' style={{
      backgroundImage: user?.image ? `url(${user.image})` : 'none',
      backgroundColor: user ? 'transparent' : '#ccc', }}></div> */}
            <h2 className='mt-2 mb-1 Script lightOrange me-4'>{user.roleId?.name}</h2>
          </div>
        </div>

        {/* DA-End-Container */}
        <div className="container-fluid DAEndContainer d-flex w-100 mx-0 px-0">
          <div className="container DAMConatiner mx-0 p-3 pb-1 text-start">
          <h6 className='lightOrange Roman ms-4'>Total Earning</h6>
            <div style={{ height: '200px', width: '100%' }} >
              <SimpleAreaChart/>
            </div>
          </div>

<div className='d-flex DAEndContainer1'>
          <div className='DAMConatiner ms-1'>
            <h3  className='mt-4 mb-0 Script lightOrange'>Rooms</h3>
            <strong style={{fontSize:"8rem"}} className='mx-5 Count'>{rooms.length}</strong>
            <hr style={{color:"white"}} className='mx-4' />
          </div>
          <div className='DAMConatiner ms-1'>
            <h3  className='mt-4 mb-0 Script lightOrange'>Events</h3>
            <strong style={{fontSize:"8rem"}} className='mx-5 Count'>{eventItems.length}</strong>
            <hr style={{color:"white"}} className='mx-4' />
          </div>
          <div className='DAMConatiner ms-1'>
            <h3  className='mt-4 mb-0 Script lightOrange'>Gallery</h3>
            <strong style={{fontSize:"8rem"}} className='mx-5 Count'>{items.length}</strong>
            <hr style={{color:"white"}} className='mx-4' />
          </div>
</div>

        </div>

      </div>
    </>
  )
}

export default DADashboard
