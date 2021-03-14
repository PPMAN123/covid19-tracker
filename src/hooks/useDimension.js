import { throttle } from 'lodash';
import { useState, useEffect } from 'react';

const useDimension = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight,
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      setDimension({
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight,
      });
    }, 1);
    window.addEventListener('resize', handleResize);

    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, []);

  return {
    dimension,
  };
};

export default useDimension;
