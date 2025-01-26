import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import DelayedLoad from './Components/DelayedLoad.jsx';
import Loading from './Components/Loading.jsx';
import DLoading from "./Components/WebUserDashboard/DLoading.jsx";
import { getme } from './RTK/Thunks/UserThunk.js';


// Lazy-loaded components
const Home = React.lazy(() => import('./Pages/Home.jsx'));
const Gallery = React.lazy(() => import('./Pages/Gallery.jsx'));
const Signup = React.lazy(() => import('./Pages/Signup.jsx'));
const SignIn = React.lazy(() => import('./Pages/SignIn.jsx'));
const OTPInput = React.lazy(() => import('./Pages/OTPInput.jsx'));
const GiftCard = React.lazy(() => import('./Pages/GiftCard.jsx'));
const Page404 = React.lazy(() => import('./Pages/Page404.jsx'));
const CheckBooking = React.lazy(() => import('./Pages/CheckBooking.jsx'));
const Rooms = React.lazy(() => import('./Pages/Rooms.jsx'));
const BookStore = React.lazy(() => import('./Pages/BookStore.jsx'));
const About = React.lazy(() => import('./Pages/About.jsx'));
const WebUserDashboard = React.lazy(() => import('./Pages/WebUserDashboard.jsx'));
const WebAdminDashboard = React.lazy(() => import('./Pages/WebAdminDashboard.jsx'));

// Bootstrap imports
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = ({ children }) => {
  const location = useLocation();

  // Specify routes where the dashboard should not be rendered
  const UserDashboardRoutes = ['/dashboard', '/dprofile', '/dgiftcard', '/dbooking'];
  const AdminDashboardRoutes = ['/DADashboard','/DABooking', '/DAChat', '/DAEvent', '/DAFeedback', '/DAGallery', '/DAGiftData', '/DARoom'];

  return (
    <>
      {/* Render the dashboard only if the current route is not in noDashboardRoutes */}
      {UserDashboardRoutes.includes(location.pathname) && <WebUserDashboard />}
      {AdminDashboardRoutes.includes(location.pathname) && <WebAdminDashboard />}
      {children}
    </>
  );
};

function App() {
  const { user, token } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // useNavigate hook for programmatic navigation

  useEffect(() => {
    if (token) {
      dispatch(getme()).catch(err => {
        console.error('Failed to fetch user data:', err);
      });
    }

    // When navigating back from restricted pages, redirect to Home
    
    // const restrictedPaths = ['/dashboard', '/dprofile', '/dgiftcard', '/dbooking','/DADashboard', '/DABooking', '/DAChat', '/DAEvent', '/DAFeedback', '/DAGallery', '/DAGiftData', '/DARoom'];
    // if (restrictedPaths.includes(window.location.pathname)) {
    //   // Redirect user to the Home page or other desired page
    //   navigate('/');
    // }
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<DelayedLoad><React.Suspense fallback={<Loading />}><Home /></React.Suspense></DelayedLoad>} />
      <Route path="/gallery" element={<DelayedLoad><React.Suspense fallback={<Loading />}><Gallery /></React.Suspense></DelayedLoad>} />
      <Route path="/giftcard" element={<DelayedLoad><React.Suspense fallback={<Loading />}><GiftCard /></React.Suspense></DelayedLoad>} />
      <Route path="/checkbooking" element={<DelayedLoad><React.Suspense fallback={<Loading />}><CheckBooking /></React.Suspense></DelayedLoad>} />
      <Route path="/rooms" element={<DelayedLoad><React.Suspense fallback={<Loading />}><Rooms /></React.Suspense></DelayedLoad>} />
      <Route path="/signup" element={<DelayedLoad><React.Suspense fallback={<Loading />}><Signup /></React.Suspense></DelayedLoad>} />
      <Route path="/signin" element={<DelayedLoad><React.Suspense fallback={<Loading />}><SignIn /></React.Suspense></DelayedLoad>} />
      <Route path="/otpinput" element={<DelayedLoad><React.Suspense fallback={<Loading />}><OTPInput /></React.Suspense></DelayedLoad>} />
      <Route path="/page404" element={<DelayedLoad><React.Suspense fallback={<Loading />}><Page404 /></React.Suspense></DelayedLoad>} />
      <Route path="/about" element={<DelayedLoad><React.Suspense fallback={<Loading />}><About /></React.Suspense></DelayedLoad>} />
      <Route path="/bookstore" element={<DelayedLoad><React.Suspense fallback={<Loading />}><BookStore /></React.Suspense></DelayedLoad>} />
      <Route path="/profile/:name" element={<DelayedLoad><React.Suspense><WebUserDashboard /></React.Suspense></DelayedLoad>} />
      <Route path="/AdminProfile/:name" element={<DelayedLoad><React.Suspense><WebAdminDashboard /></React.Suspense></DelayedLoad>} />
    </Routes>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  );
}

export default AppWithRouter;
