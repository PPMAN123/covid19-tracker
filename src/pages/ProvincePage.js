import { Grid } from '@material-ui/core';
import React from 'react';
import SimpleMenu from '../components/Menu';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core';
import BounceLoader from '../components/BounceLoader';
import { useReport } from '../context/ReportContext';
import { useProvinceSummary } from '../context/ProvinceSummaryContext';
import SummaryCard from '../components/SummaryCard';
import DropDown from '../components/DropDown';

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
  const { currentProvinceData } = useProvinceSummary();
  const c = useStyles();

  console.log(currentProvinceData);
  return (
    <div className={c.pageContainer}>
      <BounceLoader
        exitCondition={report.loadingState === 'complete'}
        className={c.bounceLoader}
      />
      <AppBar />
      <Grid>
        <Grid item>
          <SimpleMenu>
            <Grid>
              <SummaryCard
                title="Total Cases"
                amount={currentProvinceData.total_cases}
                secondaryAmount={currentProvinceData.change_cases}
                description="Total number of positive COVID-19 cases in Canada"
                toggleRequired={true}
                toggledAmount={
                  currentProvinceData.total_cases -
                  currentProvinceData.total_fatalities -
                  currentProvinceData.total_recoveries
                }
                secondaryToggleAmount={currentProvinceData.total_cases}
                toggledDescription="Total number of active COVID-19 cases in Canada"
                toggleTo="Active Cases"
              >
                <React.Fragment />
                <React.Fragment />
              </SummaryCard>
            </Grid>
          </SimpleMenu>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProvincePage;
