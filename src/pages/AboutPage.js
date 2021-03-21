import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core';
import Joke from '../components/Joke';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    margin: '20px 5%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '75px',
  },
  aboutWord: {
    padding: '20px 0px',
  },
}));

const ProvincePage = () => {
  const c = useStyles();
  return (
    <div className={c.pageContainer}>
      <AppBar />
      <Grid>
        <div className={c.aboutWord}>
          <Typography>About</Typography>
        </div>
        <Typography>
          Hi, I am a high school student learning some web development, and this
          is my first project created using react.js
        </Typography>
        <Typography>
          I don't know what else to tell ya so here's some jokes
        </Typography>
        <Joke />
      </Grid>
    </div>
  );
};

export default ProvincePage;
