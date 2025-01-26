import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"



function ImageSlider() {
  return (
    <>

    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <LazyLoadImage effect="blur"
          className="d-block w-100"
          src="/assets/images/imgSlide1.png"
          alt="Midnight Shadow"
        />
        <Carousel.Caption className='S-Head' >
          <h1> <strong className='Roman'>A Warm Welcome Awaits</strong></h1>
          <p>At Nour Al-Hayat, we pride ourselves on providing a heartfelt welcome to every guest. Our friendly staff is dedicated to making your stay comfortable and memorable. From the moment you arrive, you'll feel right at home.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <LazyLoadImage effect="blur"
          className="d-block w-100"
          src="/assets/images/imgSlide2.png"
          alt="Racine Racer"
        />
        <Carousel.Caption className='S-Head' >
        <h1><strong className='Roman Orange'>Unmatched Comfort and Luxury</strong></h1>
          <p>Experience the perfect blend of comfort and luxury in our elegantly designed rooms. Each space is thoughtfully equipped with modern amenities to ensure your utmost relaxation. Let us be your sanctuary during your travels.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <LazyLoadImage effect="blur"
          className="d-block w-100"
          src="/assets/images/imgSlide3.png"
          alt="Velocity Vanguard"
        />
        <Carousel.Caption className='S-Head ' id="img3C" >
        <h1><strong className='Roman'>Explore Local Wonders</strong></h1>
          <p>
          Located in the heart of the city, Nour Al-Hayat offers easy access to local attractions and hidden gems. Whether you’re here for business or leisure, our knowledgeable team is ready to help you discover the best the area has to offer. Your adventure starts here!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default ImageSlider
