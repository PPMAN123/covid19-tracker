import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  homebutton: {
    color: 'white',
    paddingRight: '15px',
  },
  rightButtons: {
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
  const { toggleTheme } = useTheme();
  const handleColorChange = (e) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} style={{ background: '#212121' }}>
        <Toolbar className={classes.toolBar}>
          <Button
            to="/"
            component={Link}
            className={classes.homebutton}
            onClick={() => setCurrentEndpoint('reports/')}
          >
            Ethan's Covid 19 Tracker for Canada
          </Button>
          <div>
            <IconButton
              aria-label="toggle color"
              onClick={handleColorChange}
              component={InvertColorsIcon}
              color="primary"
            />
            <Button
              to="/about"
              component={Link}
              className={classes.rightButtons}
            >
              About
            </Button>
            <Button
              to="/provinces"
              component={Link}
              className={classes.rightButtons}
            >
              Provinces
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
