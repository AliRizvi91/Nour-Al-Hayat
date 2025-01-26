// src/Components/DelayedLoad.jsx
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

function DelayedLoad({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Loading /> : children;
}

export default DelayedLoad;
