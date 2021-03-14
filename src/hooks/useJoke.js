import { useState, useEffect } from 'react';
import axios from 'axios';

const useJoke = () => {
  const [jokes, setJokes] = useState(null);
  const [currentJoke, setJoke] = useState('');

  const getRandomJoke = () => {
    //prettier-ignore
    const jokeLines = jokes.split("\n");
    const randomJokeLineNumber = Math.floor(
      Math.random() * (jokeLines.length - 1) + 1
    );
    const selectedJoke = jokeLines[randomJokeLineNumber];
    const startIndexOfJoke = selectedJoke.indexOf(',');
    const actualJoke = selectedJoke.substring(startIndexOfJoke + 1);
    setJoke(actualJoke);
  };

  useEffect(async () => {
    const response = await axios.get(
      `/.netlify/functions/node-fetch/?type=joke`
    );
    setJokes(response.data);
  }, []);

  useEffect(() => {
    if (jokes) {
      getRandomJoke();
    }
  }, [jokes]);

  return {
    currentJoke,
    getRandomJoke,
  };
};

export default useJoke;
