import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// CSS FILES
import "../CSS/Navbar.css"
import "../index.css"

// Components
import Overlay from "./Overlay";

const NavbarC = () => {
  const location = useLocation();

  

  return (
    <nav className="navbar navbar-expand-lg" style={{height:"100%"}}>
      <div className="container-fluid NavC">
        <span>
          <Link className="navbar-brand w-100" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" className='logo p-3' width="4rem" height="4rem" viewBox="0 0 800 800"> 
              <path id="NLOGo_1" data-name="NLOGo 1" className="cls-1" d="M100.745,40.026l237.819,114.99v97.147q65.392,99.12,130.8,198.259h1.982V240.268l156.563-47.583V599.116l-109-33.7v39.652L651.691,678.42V115.364L475.309,198.633V145.1L699.255,40.026q-0.991,359.8-1.982,719.68L471.346,632.82V537.656L338.564,339.4V549.552L183.982,599.116V192.685L291,224.407V184.755L148.309,117.347V682.385c64.733-31.057,190.31-93.3,190.255-93.182,0.055-.072.055,53.613,0,53.53,0.055,0.026-151.288,73.36-237.819,114.991V40.026Zm477.619,216.1-59.455,19.826V515.848l61.437,17.843Q579.354,394.923,578.364,256.128Zm-346.819,1.983v275.58h1.982L291,513.865q-0.991-119.934-1.982-239.893Z"/>
            </svg>
          </Link>
        </span>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item px-3">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item px-3">
              <Link className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`} to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item px-3">
              <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="#">Contact</Link>
            </li>
          </ul>
          <Overlay/>
        </div>
      </div>
    </nav>
  );
}

export default NavbarC;
