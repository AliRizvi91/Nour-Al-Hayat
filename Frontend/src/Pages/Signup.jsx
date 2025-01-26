import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { signup } from '../RTK/Thunks/UserThunk';
import MButton from "../Components/MButton";
import ImageUploader from "../Components/ImageUploader";
import MyPhoneInput from '../Components/Signup/PhoneInput'; 
import Loading from '../Components/Loading'; 

// CSS Files
import "../CSS/SignUp/Signup.css";

function Signup() {
  const [person, setPerson] = useState({
    name: '',
    email: '',
    password: '',
    contactNo: '',
    cityAreaId: '',
  });

  const [image, setImage] = useState(null);
  const [cityAreas, setCityAreas] = useState([]);
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=> state.userStore);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageSelect = useCallback((file) => {
    setImage(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(person).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append('image', image);
    }

    try {
      const resultAction = await dispatch(signup(formData));

      if (signup.fulfilled.match(resultAction)) {
        const Error =  new Audio('/assets/sounds/success.mp3'); // Adjust the path as necessary
        Error.play();

        toast.success('SignUp successfully');
        navigate('/');
      } else {
        toast.error('Failed to SignUp');
        const Error = new Audio('/assets/sounds/error.mp3'); // Adjust the path as necessary
        Error.play();
      }
    } catch (error) {
      console.error('Error posting person:', error);
      toast.error('Failed to post person');

  const Error = new Audio('/assets/sounds/error.mp3'); // Adjust the path as necessary
  Error.play();

    }

  };

  useEffect(() => {
    const fetchCityAreas = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/cityarea`);
        setCityAreas(data);
      } catch (error) {
        console.error('Error fetching city areas:', error);
      }
    };
    fetchCityAreas();
  }, [navigate]);

  return (
    <>  
    {loading && <Loading/>}
      <div className="container-fluid mainContainer d-flex justify-content-center align-items-center">
      <form className='smSpage position-relative p-4 mx-3 d-flex flex-column align-items-center text-center' onSubmit={handleSubmit}>
        <h1 className='Script'>Sign Up</h1>
        <ImageUploader originalFilePath={null} onImageSelect={handleImageSelect} Width={'10rem'} Height={'10rem'} BRadius={'50%'} />

        <input 
          className="form-control py-2 mb-1 mt-4 text-center" 
          type="text"
          name='name'
          value={person.name}
          onChange={handleChange}
          placeholder="Name"
          aria-label="Name" 
        />
                
        <input 
          className="form-control py-2 mb-1 text-center" 
          type="email"
          name='email'
          value={person.email}
          onChange={handleChange}
          placeholder="Email"
          aria-label="Email" 
        />
                
        <input 
          className="form-control py-2 mb-1 text-center" 
          type="password"
          name='password'
          value={person.password}
          onChange={handleChange}
          placeholder="Password"
          aria-label="Password" 
        />

        <MyPhoneInput 
          person={person} 
          setPerson={setPerson} 
          className="form-control my-2 react-tel-input" 
          placeholder="Contact Number" 
          aria-label="Contact" 
          id="contactNumber"
        />

        <select
          id='cityAreaId'
          name="cityAreaId"
          value={person.cityAreaId}
          onChange={handleChange}
          className='form-control mb-3 mt-1 text-center custom-select'
        >
          <option value="" className='options'>Select City Area...</option>
          {cityAreas.map((cityAreaId) => (
            <option value={cityAreaId._id} key={cityAreaId._id}>{cityAreaId.name}</option>
          ))}
        </select>

        <MButton type='submit' text='Sign Up' />

        <div className='d-flex justify-content-between w-100 mt-3'>
          <div><Link className='SLink' onClick={(e) => { e.preventDefault(); navigate("/"); }}>{`< Back`}</Link></div>
          <div className='text-end d-flex flex-column'>
            <Link className='m-0 SLink'>Already have an account?</Link>
            <Link className='SLink' onClick={() => navigate("/signin")}>SignIn</Link>
          </div>
        </div>
      </form>
    </div>
    </>

  );
}

export default Signup;
