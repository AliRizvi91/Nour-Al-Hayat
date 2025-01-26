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


// Icons
import PersonIcon from '@mui/icons-material/Person';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import BookmarkAddedSharpIcon from '@mui/icons-material/BookmarkAddedSharp';
// Components
// import Loading from '../Components/Loading.jsx';
import DelayedLoad from '../Components/DelayedLoad.jsx';
import { useEffect } from "react";
// Css
import "../CSS/WebUserDashboard/WebUserDashboard.css"

// WebUserDashboard Components
const UDashboard = React.lazy(() => import('../Components/WebUserDashboard/UDashboard'));
const UDProfile = React.lazy(() => import('../Components/WebUserDashboard/UDProfile.jsx'))
const UDGiftCard = React.lazy(() => import('../Components/WebUserDashboard/UDGiftCard'))
const UDBooking = React.lazy(() => import('../Components/WebUserDashboard/UDBooking'))
import DLoading from "../Components/WebUserDashboard/DLoading.jsx";


// RTK
import { logout } from "../RTK/Slices/UserSlice.js";



const drawerWidth = 240;

export default function WebUserDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const {user,loading} = useSelector((state)=> state.userStore)
  const location = useLocation()
  
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === `/profile/${user?.name}`) { // Adjust this to your actual route condition
      navigate('/dashboard');
      
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
  if (location.pathname === "/dashboard") {
    heading = "Dashboard";
    Uheading = "Yours Life ,Simplified and Beautiful Organized!";
  } else if (location.pathname === "/dgiftcard") {
    heading = "Giftcard";
    Uheading = "Your Gift Awaits-Dive In!";
  } else if (location.pathname === "/dprofile") {
    heading = "Profile";
    Uheading = "Elevate Your Identity";
  } else if (location.pathname === "/dbooking") {
    heading = "Booking";
    Uheading = "Unlock Your Perfect Experiience! ";
  }


  const drawer = (
    <div>
      <Toolbar>
        <div className='DLogo text-center'>
          <Link to="/">
        <img src="assets/images/DLogo.png" className='ms-3' style={{width:"9rem"}} alt="Error" />
          </Link>
        <div className='ms-3'><p>Nour Al-Hayat</p></div>
        </div>
      </Toolbar>
      <Divider />
      <List>
        <p className='mb-5 ms-2'>MAIN</p>
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/dashboard`)}>
            <ListItemButton>
              <ListItemIcon>
                 <SpaceDashboardIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
        
        
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/dprofile`)}>
            <ListItemButton>
              <ListItemIcon>
                 <PersonIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>
        
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/dgiftcard`)}>
            <ListItemButton>
              <ListItemIcon>
                 <RedeemTwoToneIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Giftcard</ListItemText>
            </ListItemButton>
          </ListItem>
        
        {/* ListItem 1 */}
          <ListItem disablePadding onClick={()=> navigate(`/dbooking`)}>
            <ListItemButton>
              <ListItemIcon>
                 <BookmarkAddedSharpIcon className='icons' />
              </ListItemIcon>
              <ListItemText>Booking</ListItemText>
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
  <Route path={`${user? "/dashboard":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><UDashboard /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/dprofile":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><UDProfile /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/dgiftcard":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><UDGiftCard /></React.Suspense></DelayedLoad>} />
  <Route path={`${user? "/dbooking":""}`} element={<DelayedLoad><React.Suspense fallback={<DLoading/>}><UDBooking /></React.Suspense></DelayedLoad>} />
</Routes>

</Box>
    </Box>
  );
}
