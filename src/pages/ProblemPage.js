import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    margin: '20px 5%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '75px',
    color: 'secondary',
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
      <p>THERE'S NOTHING HERE YOU MUPPET</p>
    </div>
  );
};

export default ProvincePage;
