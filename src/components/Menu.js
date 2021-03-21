import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useReport } from '../context/ReportContext';
import CumulativeChart from '../hoc/CumulativeChart';
import { Grid } from '@material-ui/core';
import ProvinceDailyChart from '../hoc/ProvinceDailyChart';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState('Select Province');
  const { setCurrentEndpoint } = useReport();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const provinceCodeMapping = {
    Alberta: 'AB',
    'British Columbia': 'BC',
    Manitoba: 'MB',
    'New Brunswick': 'NB',
    'Newfoundland and Labrador': 'NL',
    'Northwest Territories': 'NT',
    'Nova Scotia': 'NS',
    Nunavut: 'NU',
    Ontario: 'ON',
    'Prince Edward Island': 'PE',
    Quebec: 'QC',
    Saskatchewan: 'SK',
    Yukon: 'YT',
  };

  const handleClose = (name) => {
    setAnchorEl(null);
    if (name) {
      setName(name);
      setCurrentEndpoint(`reports/province/${provinceCodeMapping[name]}`);
    }
  };

  return (
    <Grid>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        {name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose('Alberta')}>Alberta</MenuItem>
        <MenuItem onClick={() => handleClose('British Columbia')}>
          British Columbia
        </MenuItem>
        <MenuItem onClick={() => handleClose('Manitoba')}>Manitoba</MenuItem>
        <MenuItem onClick={() => handleClose('New Brunswick')}>
          New Brunswick
        </MenuItem>
        <MenuItem onClick={() => handleClose('Newfoundland and Labrador')}>
          Newfoundland and Labrador
        </MenuItem>
        <MenuItem onClick={() => handleClose('Northwest Territories')}>
          Northwest Territories
        </MenuItem>
        <MenuItem onClick={() => handleClose('Nova Scotia')}>
          Nova Scotia
        </MenuItem>
        <MenuItem onClick={() => handleClose('Nunavut')}>Nunavut</MenuItem>
        <MenuItem onClick={() => handleClose('Ontario')}>Ontario</MenuItem>
        <MenuItem onClick={() => handleClose('Prince Edward Island')}>
          Prince Edward Island
        </MenuItem>
        <MenuItem onClick={() => handleClose('Quebec')}>Quebec</MenuItem>
        <MenuItem onClick={() => handleClose('Saskatchewan')}>
          Saskatchewan
        </MenuItem>
        <MenuItem onClick={() => handleClose('Yukon')}>Yukon</MenuItem>
      </Menu>
      <Grid>
        <Grid item>
          <CumulativeChart />
        </Grid>
        <Grid item>
          <ProvinceDailyChart />
        </Grid>
      </Grid>
    </Grid>
  );
}
