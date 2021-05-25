import React from 'react';
import { useSummary } from '../context/SummaryContext';
import SummaryCard from '../components/SummaryCard';
import { Grid, makeStyles } from '@material-ui/core';
import BounceLoader from '../components/BounceLoader';
import CumulativeChart from '../hoc/CumulativeChart';
import Table from '../components/Table';
import ProvinceComparisonChart from '../hoc/ProvinceComparisonChart';
import AppBar from '../components/Appbar';
import DailyChart from '../hoc/DailyChart';
import DropDown from '../components/DropDown';
import useLastDayData from '../hooks/useLastDaysData';
import Switch from '../components/Switch';
import { SwitchProvider } from '../context/SwitchContext';

const useStyles = makeStyles((theme) => ({
  container: {
    transition: 'opacity 0.5s ease',
  },
  beforeLoading: {
    opacity: 0,
  },
  afterLoading: {
    opacity: 1,
  },
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

const HomePage = () => {
  const { summary } = useSummary();
  const c = useStyles();
  const lastDays = useLastDayData(6);

  return (
    <div className={c.pageContainer}>
      <AppBar />
      <BounceLoader
        exitCondition={
          summary.loadingState === 'complete' && lastDays.length != 0
        }
      />
      <Grid
        spacing={3}
        container
        direction="column"
        justify="center"
        className={`${c.container} ${
          summary.loadingState === 'complete' ? c.afterLoading : c.beforeLoading
        }`}
      >
        <Grid spacing={3} container direction="row" justify="center" item>
          <Grid item md={4} sm={6} xs={12}>
            <SwitchProvider>
              {lastDays.length != 0 && (
                <SummaryCard
                  title="Total Cases"
                  amount={summary.total_cases}
                  secondaryAmount={summary.change_cases}
                  description="Total number of positive COVID-19 cases in Canada"
                  toggleRequired={true}
                  toggledAmount={
                    summary.total_cases -
                    summary.total_fatalities -
                    summary.total_recoveries
                  }
                  secondaryToggleAmount={
                    summary.total_cases -
                    summary.total_fatalities -
                    summary.total_recoveries -
                    (lastDays[5].total_cases -
                      lastDays[5].total_fatalities -
                      lastDays[5].total_recoveries)
                  }
                  toggledDescription="Total number of active COVID-19 cases in Canada"
                  toggleTo="Active Cases"
                >
                  <Switch />
                  <DropDown
                    days={lastDays}
                    info="total_cases"
                    secondaryInfo="change_cases"
                    isCases={true}
                  />
                </SummaryCard>
              )}
            </SwitchProvider>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <SummaryCard
              title="Total Fatalities"
              amount={summary.total_fatalities}
              secondaryAmount={summary.change_fatalities}
              description="Total number of deaths due to COVID-19 in Canada"
            >
              <React.Fragment />
              <DropDown
                days={lastDays}
                info="total_fatalities"
                secondaryInfo="change_fatalities"
              />
            </SummaryCard>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <SummaryCard
              title="Total Tests"
              amount={summary.total_tests}
              secondaryAmount={summary.change_tests}
              description="Total number of COVID-19 tests done in Canada"
            >
              <React.Fragment />
              <DropDown
                days={lastDays}
                info="total_tests"
                secondaryInfo="change_tests"
              />
            </SummaryCard>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <SwitchProvider>
              <SummaryCard
                title="Total Hospitalizations"
                amount={summary.total_hospitalizations}
                secondaryAmount={summary.change_hospitalizations}
                description="Total number of COVID-19 patients hospitalized in Canada"
                toggleRequired={true}
                toggledAmount={summary.total_criticals}
                secondaryToggleAmount={summary.change_criticals}
                toggledDescription="Total number of COVID patients in critical conditions in Canada"
                toggleTo="Criticals"
              >
                <Switch />
                <DropDown
                  days={lastDays}
                  info="total_hospitalizations"
                  secondaryInfo="change_hospitalizations"
                  toggleInfo="total_criticals"
                  toggleSecondaryInfo="change_criticals"
                />
              </SummaryCard>
            </SwitchProvider>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <SummaryCard
              title="Total Recoveries"
              amount={summary.total_recoveries}
              secondaryAmount={summary.change_recoveries}
              description="Total number of COVID-19 recoveries in Canada"
            >
              <React.Fragment />
              <DropDown
                days={lastDays}
                info="total_recoveries"
                secondaryInfo="change_recoveries"
              />
            </SummaryCard>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <SummaryCard
              title="Total Vaccinations"
              amount={summary.total_vaccinations}
              secondaryAmount={summary.change_vaccinations}
              description="Total number of COVID-19 vaccination doses given in Canada"
            >
              <React.Fragment />
              <DropDown
                days={lastDays}
                info="total_vaccinations"
                secondaryInfo="change_vaccinations"
              />
            </SummaryCard>
          </Grid>
        </Grid>
        <Grid item spacing={3} container direction="row" justify="center">
          <Grid item lg={6} xs={12}>
            <CumulativeChart />
          </Grid>
          <Grid item lg={6} xs={12}>
            <ProvinceComparisonChart />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DailyChart />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
