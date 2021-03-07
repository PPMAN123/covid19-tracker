import { Grid } from '@material-ui/core';
import React from 'react';
import SimpleMenu from '../components/Menu';
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
  },
}));

const ProvincePage = () => {
  const c = useStyles();
  return (
    <div className={c.pageContainer}>
      <AppBar />
      <Grid>
        <Grid item>
          <SimpleMenu />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProvincePage;
