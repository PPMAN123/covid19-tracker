import { useState, useEffect } from 'react';
import axios from 'axios';

const useJoke = () => {
  const [currentJoke, setJoke] = useState('');
  const [status, setStatus] = useState('loading');

  const getRandomJoke = () => {
    setStatus('loading');
  };

  useEffect(async () => {
    await getRandomJoke();
  }, []);

  useEffect(async () => {
    if (status === 'loading') {
      const response = await axios.get(
        `/.netlify/functions/node-fetch/?type=joke`
      );
      setJoke(response.data);
    }
  }, [status]);

  useEffect(() => {
    if (currentJoke.length > 0) {
      setStatus('complete');
    }
  }, [currentJoke]);

  return {
    currentJoke,
    getRandomJoke,
    status,
  };
};

export default useJoke;
