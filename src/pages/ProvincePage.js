import { Grid } from '@material-ui/core';
import React from 'react';
import SimpleMenu from '../components/Menu';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core';
import BounceLoader from '../components/BounceLoader';
import { useReport } from '../context/ReportContext';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    padding: '20px 5%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '75px',
    backgroundColor: theme.palette.background.default,
  },
}));

const ProvincePage = () => {
  const { setCurretEndPoint, report } = useReport();
  const c = useStyles();
  return (
    <div className={c.pageContainer}>
      <BounceLoader
        exitCondition={report.loadingState === 'complete'}
        className={c.bounceLoader}
      />
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
