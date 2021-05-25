import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import _ from 'lodash';
import { useSwitch } from '../context/SwitchContext';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const DropDown = ({
  days,
  info,
  secondaryInfo,
  isCases,
  toggleInfo,
  toggleSecondaryInfo,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { switchState, setSwitchState } = useSwitch();

  return (
    <React.Fragment>
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {days != 0 &&
          (isCases ? (
            switchState ? (
              <React.Fragment>
                <Typography className={classes.typography}>
                  1 day ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(
                      days[5].total_cases -
                        days[5].total_fatalities -
                        days[5].total_recoveries
                    )}{' '}
                    active {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(
                      days[5].total_cases -
                        days[5].total_fatalities -
                        days[5].total_recoveries -
                        (days[4].total_cases -
                          days[4].total_fatalities -
                          days[4].total_recoveries)
                    )}{' '}
                    new active {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  2 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(
                      days[4].total_cases -
                        days[4].total_fatalities -
                        days[4].total_recoveries
                    )}{' '}
                    active {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(
                      days[4].total_cases -
                        days[4].total_fatalities -
                        days[4].total_recoveries -
                        (days[3].total_cases -
                          days[3].total_fatalities -
                          days[3].total_recoveries)
                    )}{' '}
                    new active {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  3 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(
                      days[3].total_cases -
                        days[3].total_fatalities -
                        days[3].total_recoveries
                    )}{' '}
                    active {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(
                      days[3].total_cases -
                        days[3].total_fatalities -
                        days[3].total_recoveries -
                        (days[2].total_cases -
                          days[2].total_fatalities -
                          days[2].total_recoveries)
                    )}{' '}
                    new active {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  4 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(
                      days[2].total_cases -
                        days[2].total_fatalities -
                        days[2].total_recoveries
                    )}{' '}
                    active {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(
                      days[2].total_cases -
                        days[2].total_fatalities -
                        days[2].total_recoveries -
                        (days[1].total_cases -
                          days[1].total_fatalities -
                          days[1].total_recoveries)
                    )}{' '}
                    new active {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  5 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(
                      days[1].total_cases -
                        days[1].total_fatalities -
                        days[1].total_recoveries
                    )}{' '}
                    active {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(
                      days[1].total_cases -
                        days[1].total_fatalities -
                        days[1].total_recoveries -
                        (days[0].total_cases -
                          days[0].total_fatalities -
                          days[0].total_recoveries)
                    )}{' '}
                    new active {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography className={classes.typography}>
                  1 day ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(days[5][info])}{' '}
                    {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(days[5][secondaryInfo])}{' '}
                    new {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  2 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(days[4][info])}{' '}
                    {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(days[4][secondaryInfo])}{' '}
                    new {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  3 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(days[3][info])}{' '}
                    {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(days[3][secondaryInfo])}{' '}
                    new {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  4 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(days[2][info])}{' '}
                    {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(days[2][secondaryInfo])}{' '}
                    new {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  5 days ago{' '}
                  <span>
                    {Intl.NumberFormat('en-US').format(days[1][info])}{' '}
                    {info.substring(info.indexOf('_') + 1)}{' '}
                  </span>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      signDisplay: 'always',
                    }).format(days[1][secondaryInfo])}{' '}
                    new {info.substring(info.indexOf('_') + 1)}
                  </span>
                </Typography>
              </React.Fragment>
            )
          ) : switchState ? (
            <React.Fragment>
              <Typography className={classes.typography}>
                1 day ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[5][toggleInfo])}{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[5][toggleSecondaryInfo]
                  )}{' '}
                  new{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                2 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[4][toggleInfo])}{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[4][toggleSecondaryInfo]
                  )}{' '}
                  new{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                3 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[3][toggleInfo])}{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[3][toggleSecondaryInfo]
                  )}{' '}
                  new{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                4 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[2][toggleInfo])}{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[2][toggleSecondaryInfo]
                  )}{' '}
                  new{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                5 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[1][toggleInfo])}{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[1][toggleSecondaryInfo]
                  )}{' '}
                  new{' '}
                  {toggleSecondaryInfo.substring(
                    toggleSecondaryInfo.indexOf('_') + 1
                  )}
                </span>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography className={classes.typography}>
                1 day ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[5][info])}{' '}
                  {info.substring(info.indexOf('_') + 1)}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[5][secondaryInfo]
                  )}{' '}
                  new {info.substring(info.indexOf('_') + 1)}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                2 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[4][info])}{' '}
                  {info.substring(info.indexOf('_') + 1)}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[4][secondaryInfo]
                  )}{' '}
                  new {info.substring(info.indexOf('_') + 1)}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                3 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[3][info])}{' '}
                  {info.substring(info.indexOf('_') + 1)}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[3][secondaryInfo]
                  )}{' '}
                  new {info.substring(info.indexOf('_') + 1)}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                4 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[2][info])}{' '}
                  {info.substring(info.indexOf('_') + 1)}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[2][secondaryInfo]
                  )}{' '}
                  new {info.substring(info.indexOf('_') + 1)}
                </span>
              </Typography>
              <Typography className={classes.typography}>
                5 days ago{' '}
                <span>
                  {Intl.NumberFormat('en-US').format(days[1][info])}{' '}
                  {info.substring(info.indexOf('_') + 1)}{' '}
                </span>
                <span>
                  {Intl.NumberFormat('en-US', { signDisplay: 'always' }).format(
                    days[1][secondaryInfo]
                  )}{' '}
                  new {info.substring(info.indexOf('_') + 1)}
                </span>
              </Typography>
            </React.Fragment>
          ))}
      </Popover>
    </React.Fragment>
  );
};

export default DropDown;
