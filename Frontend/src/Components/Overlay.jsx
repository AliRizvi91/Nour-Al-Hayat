import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link,useNavigate } from "react-router-dom";

// RTK
import { useSelector } from "react-redux";
// Css files
import "../CSS/Navbar.css"
import "../index.css"
import "../App.css"

// Icons
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import CardGiftcardSharpIcon from '@mui/icons-material/CardGiftcardSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

function PopoverPositionedExample() {
  const { user ,loading} = useSelector((state) => state.userStore);
  const navigate = useNavigate()

  const handleProfileButton= ()=>{
    if(user.roleId?.name === "User"){
      navigate(user ? `/profile/${user.name}` : '#')
    }else if(user.roleId?.name === "Admin"){
      navigate(user ? `/AdminProfile/${user.name}` : '#')
    }
  }

  return (
    <>
      {['bottom'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Body>
                <div className='w-100 h-100 d-flex justify-content-center align-items-center popover-icon'>
                  <Link to={'/giftcard'}>
                    <CardGiftcardSharpIcon className='icons' /> <span>GiftCard</span>
                  </Link>
                </div>
                <div className='w-100 h-100 d-flex justify-content-center align-items-center popover-icon'>
                  <Link to={'/signin'}>
                    <LoginSharpIcon className='icons' /> <span>Login</span>
                  </Link>
                </div>
                <div className='w-100 h-100 d-flex justify-content-center align-items-center popover-icon'>
                  <Link to={'/signup'}>
                    <AccountCircleSharpIcon className='icons' /> <span>SignUp</span>
                  </Link>
                </div>
                <div className='w-100 h-100 d-flex justify-content-center align-items-center popover-icon'>
                  <div className="text-center d-flex flex-column justify-content-center align-items-center">
<button
  // to={user ? `/profile/${user.name}` : '#'} 
  className=" profileImg "
    style={{
      backgroundImage: user?.image ? `url(${user.image})` : 'none',
      backgroundColor: user ? 'transparent' : '#ccc', 
    }}
    onClick={handleProfileButton}
>
</button>
  <p>{user ? user?.name : ""}</p>
</div>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <div><ViewCompactIcon className='icons' /></div>
        </OverlayTrigger>
      ))}
    </>
  );
}

export default PopoverPositionedExample;
