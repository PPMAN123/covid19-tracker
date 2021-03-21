import { useState, useEffect } from 'react';
import axios from 'axios';

const useJoke = () => {
  const [currentJoke, setJoke] = useState('');

  const getRandomJoke = async () => {
    const response = await axios.get(
      `/.netlify/functions/node-fetch/?type=joke`
    );
    setJoke(response.data);
  };

  useEffect(async () => {
    await getRandomJoke();
  }, []);

  return {
    currentJoke,
    getRandomJoke,
  };
};

export default useJoke;
