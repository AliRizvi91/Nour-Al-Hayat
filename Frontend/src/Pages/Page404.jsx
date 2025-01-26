import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
// Css Files
import "react-lazy-load-image-component/src/effects/blur.css"


function Page404() {
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center" style={{height:"100vh"}}>
        <LazyLoadImage effect="blur" src="/assets/images/404.png" style={{width:"18%"}} alt="Error" />
        <p style={{width:"26%"}}> We’re sorry, but it seems you've encountered a 404 error—this page can't be found.
           Please check our homepage or use the search function to locate what you need.</p>
      </div>
    </>
  )
}

export default Page404
