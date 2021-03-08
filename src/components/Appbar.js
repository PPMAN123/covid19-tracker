import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useReport } from '../context/ReportContext';

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
  toolBar: {
    justifyContent: 'space-between',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { setCurrentEndpoint } = useReport();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} style={{ background: '#212121' }}>
        <Toolbar className={classes.toolBar}>
          <Button
            to="/"
            component={Link}
            className={classes.homebutton}
            onclick={() => setCurrentEndpoint('reports/')}
          >
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
