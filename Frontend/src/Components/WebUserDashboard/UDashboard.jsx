import React , {useEffect} from 'react'
import { useSelector,useDispatch } from "react-redux";
import {getAllBooking} from '../../RTK/Thunks/BookingThunks'

{/* Components */}
import AreaChart from "../Charts/AreaChart_C";
{/* CSS */}
import "../../CSS/WebUserDashboard/UDashboard.css"
{/* Icons */}
import NextWeekSharpIcon from '@mui/icons-material/NextWeekSharp';
import BookmarkAddedSharpIcon from '@mui/icons-material/BookmarkAddedSharp';
import GifBoxSharpIcon from '@mui/icons-material/GifBoxSharp';

function UDashboard() {
  const {user} = useSelector((state)=> state.userStore)
  const { Bookingitems } = useSelector((state) => state.BookingStore);
  const dispatch = useDispatch()

  
  // Calculate the total gift price if giftStore exists
  const filterOurBooking = Bookingitems.filter((booked)=> booked?.userId === user?._id)

  const totalGiftAmount = user.giftStore?.reduce((total, gift) => total + (gift.price || 0), 0);
  const totalBookingAmount = filterOurBooking?.reduce((total, booked) => total + (Number(booked?.amount) || 0), 0);
  const totalDeposit = totalGiftAmount + totalBookingAmount
  
  useEffect(()=>{
    dispatch(getAllBooking())
  },[dispatch])





  return (
    <>
      <div className="container-fluid d-flex flex-column m-0">
        <div className="container-fluid d-flex pt-5 pb-5 justify-content-center">
          {/*------------- Info card */}
          <div className="infoCard mx-5 p-5 text-center d-flex flex-column align-items-center">
            <NextWeekSharpIcon className="DIcons m-2 mb-3" id="Deposit" />
            <h2 className='mb-0'><strong>$ {totalDeposit}</strong></h2>
            <p>Deposit Amount</p>
          </div>
          <div className="infoCard mx-5 p-5 text-center d-flex flex-column align-items-center">
            <BookmarkAddedSharpIcon className="DIcons m-2 mb-3" id="Dbooking" />
            <h2 className='mb-0'><strong>$ {totalBookingAmount}</strong></h2>
            <p>Booking Amount</p>
          </div>
          <div className="infoCard mx-5 p-5 text-center d-flex flex-column align-items-center">
            <GifBoxSharpIcon className="DIcons m-2 mb-3" id="DGift" />
            <h2 className='mb-0'><strong>$ {totalGiftAmount}</strong></h2>
            <p>Gift Amount</p>
          </div>
        </div>

        <div className="container-fluid w-100 pt-2 ">
          <div className="container-fluid d-flex flex-row justify-content-between mx-5">
            <h5><strong>Spent</strong></h5>
            <p>Last: {Bookingitems?.length || 0} Bookings</p>
          </div>


            {/* Chat */}
            <div className="container-fluid Graph w-100 h-100">
             <AreaChart  Data={filterOurBooking} XShow={'startDate'} YShow={'amount'}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default UDashboard
