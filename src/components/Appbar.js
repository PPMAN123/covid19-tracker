import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  homebutton: {
    color: 'white',
  },
  provincesButton: {
    color: 'white',
  },
  appBar: {
    color: '#212121',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.appBar}>
          <Button to="/" component={Link} className={classes.homebutton}>
            Ethan's Covid 19 Tracker for Canada
          </Button>
          <Button
            to="/provinces"
            component={Link}
            className={classes.provincesButton}
          >
            Provinces
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
