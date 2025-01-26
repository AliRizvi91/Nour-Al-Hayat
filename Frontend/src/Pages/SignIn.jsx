import React, { useState, useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// RTK Files
import { login } from '../RTK/Thunks/UserThunk';
// CSS Files
import "../CSS/SignUp/Signup.css";
// Component Files
import MButton from "../Components/MButton";
import Loading from '../Components/Loading'; 

function SignIn() {
  const [person, setPerson] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const {loading} = useSelector((state)=> state.userStore);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }, []);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch(login(person)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        navigate("/otpinput", { state: { email: person.email } });
        toast.success('Email has been sent!');
        const success = new Audio('/assets/sounds/success.mp3'); // Adjust the path as necessary
        success.play();
      } else {
        toast.error('Email has not been sent!');
        const Error = new Audio('/assets/sounds/error.mp3'); // Adjust the path as necessary
        Error.play();
      }
    });
  }, [dispatch, person, navigate]);


  return (
    <>  
    {loading && <Loading/>}
      <div className="container-fluid mainContainer d-flex justify-content-center align-items-center">
      <form className='smSpage position-relative p-4 mx-3 d-flex flex-column align-items-center text-center' onSubmit={handleSubmit}>
        <h1 className='Script'>Sign In</h1>

        
                
        <input 
          className="form-control py-2 mt-4 mb-1 text-center" 
          type="email"
          name='email'
          value={person.email}
          onChange={handleChange}
          placeholder="Email"
          aria-label="Email" 
        />
                
        <input 
          className="form-control py-2 mb-4 text-center" 
          type="password"
          name='password'
          value={person.password}
          onChange={handleChange}
          placeholder="Password"
          aria-label="Password" 
        />


        <MButton type='submit' text='Sign In' />

        <div className='d-flex justify-content-between w-100 mt-3'>
          <div><Link className='SLink' onClick={(e) => { e.preventDefault(); navigate("/"); }}>{`< Back`}</Link></div>
          <div className='text-end d-flex flex-column'>
            <Link className='m-0 SLink'>Don't have an account?</Link>
            <Link className='SLink' onClick={() => navigate("/signup")}>SignUp</Link>
          </div>
        </div>
      </form>
    </div>
    </>

  );
}

export default SignIn;
