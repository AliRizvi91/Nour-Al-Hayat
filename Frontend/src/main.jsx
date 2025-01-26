import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Files
import { store } from './RTK/store.js';
import App from './App.jsx';
import './index.css';

//-------- Bootstrap--------
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//-------- React-Toastify--------
import { ToastContainer, toast, Bounce } from 'react-toastify'; // Import Bounce here
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce} // Now this should work
      />
    </Provider>
  </StrictMode>
);
