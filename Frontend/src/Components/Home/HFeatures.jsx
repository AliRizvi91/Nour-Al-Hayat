import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeatures } from '../../RTK/Slices/FeaturesSlice'; // Adjust the import based on your file structure
import { LazyLoadImage } from 'react-lazy-load-image-component';

// CSS Files
import "../../CSS/Home/HFeatures.css";
import "react-lazy-load-image-component/src/effects/blur.css"

function HFeatures() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.featureStore); // Adjust based on your state structure



  useEffect(() => {
    const fetchAllFeatures = async () => {
      try {
        await dispatch(fetchFeatures());
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllFeatures();
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <div className="spinner-border text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>; // Show a loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if feedback exists
  if (!items || items.length === 0) {
    return <div>No feedback available.</div>;
  }

  return (
    <div className="container-fluid text-center">
      <h6 className='Roman lightOrange' style={{textTransform:"uppercase"}}>Extra Features</h6>
      <h1 className='Roman mb-5'>Why Choose Us</h1>

      <div className='container-xl FContainer'>
        {items.map((feature,index) => (
          <div key={feature._id} className='d-flex justify-content-center align-items-center FBlock'>

            <div className='FIcon m-2 p-2'>
              {feature.image.startsWith('<svg') ? (
                <span dangerouslySetInnerHTML={{ __html: feature.image }} />
              ) : (
                <LazyLoadImage effect="blur" src={feature.image} alt={feature.name} style={{ width: '30px', height: '30px' }} />
              )}
            </div>

            <div className='text-start'>
              <h4 className='Roman'>
                <span className='lightOrange Roman' style={{fontSize:"0.7rem"}}>{String(index + 1).padStart(2, '0')}</span>/{feature.name}
              </h4>
              <p style={{fontSize:"0.7rem"}}>{feature.explaination}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HFeatures;
