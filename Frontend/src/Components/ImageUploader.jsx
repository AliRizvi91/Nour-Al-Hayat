import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import "../CSS/WebUserDashboard/UDProfile.css";

const ImageUploader = memo(({ originalFilePath, onImageSelect ,DefaultImg,Width,Height,BRadius,originalImg }) => {
  const [image, setImage] = useState(originalFilePath || null);
  const inputRef = useRef(null);
  const {user} =useSelector((state)=> state.userStore)
  
  
  useEffect(() => {
    if (originalFilePath) {
      setImage(originalFilePath);
    }
  }, [originalFilePath]);

  useEffect(() => {
    let objectURL;
    if (image && image instanceof File) {
      objectURL = URL.createObjectURL(image);
    }

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      onImageSelect(file); // Call the callback with the file
      console.log('file',file);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <div style={styles.container} className='PIMGContainer'>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={styles.input}
        ref={inputRef}
      />
      <div
        style={{
          ...styles.imageSelector,
          backgroundImage: `url(${imageUrl})`,
          width:Width,
          height:Height,
          borderRadius:BRadius,
        }}
        onClick={handleClick}
      >
        {DefaultImg === true ? '' : !image && originalImg && <img style={{ width: "4rem", height: "5rem" }} src={originalImg} />}
        {DefaultImg === true ? '' : !image && <span style={styles.text}>Select Image</span>}
        {DefaultImg === true && <div className='PImg' style={{ backgroundImage: `url(${user?.image})` }}></div>}
      </div>
    </div>
  );
});

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  input: {
    display: 'none', // Hide the default file input
  },
  imageSelector: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // transition: 'opacity 0.3s ease',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default ImageUploader;
