import React, { useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Css FIle
import "../../App.css"

function MyPhoneInput({ person, setPerson }) {
  // useCallback Hook
  const handleChangePN = useCallback((value) => {
    setPerson(prevPerson => ({
      ...prevPerson,
      contactNo: value,
    }));
  }, [setPerson]);

  return (
    <>
      {/* <label htmlFor="contactNumber">Contact Number:</label> */}
      <PhoneInput
        inputProps={{
          id: 'contactNumber',
          name: 'contactNo',
          required: true,
          autoFocus: true,
        className:"form-control w-100 text-center"
        }}
        
        type="tel"
        country={'pk'}
        value={person.contactNo}
        onChange={handleChangePN}
        autoComplete="tel"
      />
    </>
  );
}

export default MyPhoneInput;
