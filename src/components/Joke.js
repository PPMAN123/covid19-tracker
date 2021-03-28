import React from 'react';
import useJoke from '../hooks/useJoke';
import Typography from '@material-ui/core/Typography';
import LinearLoader from './LinearLoader';
import Button from '@material-ui/core/Button';
import { Fragment } from 'react';

const Joke = () => {
  const { currentJoke, status, getRandomJoke } = useJoke();
  if (status === 'loading') {
    return (
      <Fragment>
        <Button
          onClick={() => getRandomJoke()}
          color="primary"
          variant="outlined"
        >
          Random Joke
        </Button>
        <LinearLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Button
          onClick={() => getRandomJoke()}
          color="primary"
          variant="outlined"
        >
          Random Joke
        </Button>
        <Typography color="textPrimary">{currentJoke}</Typography>
      </Fragment>
    );
  }
};

export default Joke;
