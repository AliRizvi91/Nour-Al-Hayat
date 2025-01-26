import * as React from 'react';
import { useSelector,useDispatch } from "react-redux";
import { Routes , Route , useNavigate ,useLocation ,Link  } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


// RTK
import { logout } from "../RTK/Slices/UserSlice.js";

// Icons
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import LiquorIcon from '@mui/icons-material/Liquor';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BookIcon from '@mui/icons-material/Book';
// Components
import DelayedLoad from '../Components/DelayedLoad.jsx';
import { useEffect } from "react";
// Css
import "../CSS/WebUserDashboard/WebUserDashboard.css"

// WebUserDashboard Components
const DADashboard = React.lazy(() => import('../Components/WebAdminDashboard/DADashboard.jsx'))
const DABooking = React.lazy(() => import('../Components/WebAdminDashboard/DABooking.jsx'));
const DAChat = React.lazy(() => import('../Components/WebAdminDashboard/DAChat.jsx'))
const DAEvent = React.lazy(() => import('../Components/WebAdminDashboard/DAEvent.jsx'))
const DAGallery = React.lazy(() => import('../Components/WebAdminDashboard/DAGallery.jsx'))
const DAGiftData = React.lazy(() => import('../Components/WebAdminDashboard/DAGiftData.jsx'))
const DARoom = React.lazy(() => import('../Components/WebAdminDashboard/DARoom.jsx'))

import DLoading from "../Components/WebUserDashboard/DLoading.jsx";




const drawerWidth = 240;

export default function WebAdminDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const {user,loading} = useSelector((state)=> state.userStore)
  const location = useLocation()
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === `/AdminProfile/${user?.name}`) { // Adjust this to your actual route condition
      navigate('/DADashboard');
    }
  }, [navigate, location.pathname]);
  

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleLogOut = ()=>{
    dispatch(logout())
    navigate('/')
  }

  let heading;
  let Uheading;
  if (location.pathname === "/DADashboard") {
    heading = "Dashboard";
    Uheading = "Yours Life ,Simplified and Beautiful Organized!";
  } else if (location.pathname === "/DABooking") {
    heading = "Booking";
    Uheading = "Book Your Dream Escape Today! ";
  } else if (location.pathname === "/DAChat") {
    heading = "Chats";
    Uheading = "Spark Meaningful Conversations Anytime, Anywhere";
  }else if (location.pathname === "/DAEvent") {
    heading = "Events";
    Uheading = "Unforgettable Events, Unmatched Experiences!";
  }else if (location.pathname === "/DAGallery") {
    heading = "Gallery";
    Uheading = "Explore Our Gallery: A Visual Journey Awaits!";
  }else if (location.pathname === "/DAGiftData") {
    heading = "Giftcard";
    Uheading = "Your Gift Awaits-Dive In!";
  }else if (location.pathname === "/DARoom") {
    heading = "Rooms";
    Uheading = "Step Inside: Discover Our Stunning Rooms in the Gallery!";
  }


  const drawer = (
    <div>
      <Toolbar>
        <div className='DLogo text-center'>
          <Link to="/">
        <img src="/assets/images/DLogo.png" className='ms-3' style={{width:"9rem"}} alt="Error" />
          </Link>
        <div className='ms-3'><p>Nour Al-Hayat</p></div>
        </div>
      </Toolbar>
      <Divider />
      <List>
        <p className='mb-5 ms-2 Roman'>MAIN</p>
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DADashboard`)}>
            <ListItemButton>
              <ListItemIcon>
                 <SpaceDashboardIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DABooking`)}>
            <ListItemButton>
              <ListItemIcon>
                 <BookIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Bookings</ListItemText>
            </ListItemButton>
          </ListItem>
        
        
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DAChat`)}>
            <ListItemButton>
              <ListItemIcon>
                 <WhatsAppIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Chat</ListItemText>
            </ListItemButton>
          </ListItem>
        
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DAEvent`)}>
            <ListItemButton>
              <ListItemIcon>
                 <LiquorIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Events</ListItemText>
            </ListItemButton>
          </ListItem>
        
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DAGallery`)}>
            <ListItemButton>
              <ListItemIcon>
                 <AddAPhotoIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Gallery</ListItemText>
            </ListItemButton>
          </ListItem>
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DAGiftData`)}>
            <ListItemButton>
            <ListItemIcon>
                 <RedeemTwoToneIcon className='icons' />
              </ListItemIcon>
              <ListItemText>GiftData</ListItemText>
            </ListItemButton>
          </ListItem>
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/DARoom`)}>
            <ListItemButton>
              <ListItemIcon>
                 <BedroomParentIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Rooms</ListItemText>
            </ListItemButton>
          </ListItem>

        {/* ListItem 1 */}
          <ListItem disablePadding>
              <button onClick={handleLogOut} className='Logout text-center py-2 px-2 mt-4 mx-3 Roman'>Log Out</button>
          </ListItem>
        

      </List>
      {/* <Divider /> */}
      
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>
            <h1 className='Script mb-0 lightOrange'>{heading}</h1>
            <p className='Dpara'>{Uheading}</p>
          </Typography>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
  <Toolbar />
  
  <Routes>
  <Route path={`${user? "/DADashboard":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DADashboard /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/DABooking":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DABooking /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/DAChat":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DAChat /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/DAEvent":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DAEvent /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/DAGallery":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DAGallery /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/DAGiftData":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DAGiftData /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/DARoom":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><DARoom /></React.Suspense></DelayedLoad>} />
</Routes>

</Box>
    </Box>
  );
}
