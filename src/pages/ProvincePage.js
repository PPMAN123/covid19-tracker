import { Grid } from '@material-ui/core';
import React from 'react';
import SimpleMenu from '../components/Menu';
import AppBar from '../components/Appbar';
import { makeStyles, Typography } from '@material-ui/core';
import BounceLoader from '../components/BounceLoader';
import { useReport } from '../context/ReportContext';
import { useProvinceSummary } from '../context/ProvinceSummaryContext';
import SummaryCard from '../components/SummaryCard';
import DropDown from '../components/DropDown';
import Switch from '../components/Switch';
import useLastDayData from '../hooks/useLastDaysData';
import CumulativeChart from '../hoc/CumulativeChart';
import ProvinceDailyChart from '../hoc/ProvinceDailyChart';
import { SwitchProvider } from '../context/SwitchContext';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    padding: '20px 5%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '90px',
    backgroundColor: theme.palette.background.default,
  },
  substitutePage: {
    height: 'calc(100vh - 95px - 51px)',
  },
  bounceLoader: {
    height: '110vh!important',
  },
}));

const ProvincePage = () => {
  const { currentEndpoint, report } = useReport();
  const { currentProvinceData, selectedProvince } = useProvinceSummary();
  const c = useStyles();
  const lastDays = useLastDayData(6);
  console.log(currentProvinceData);
  console.log(lastDays);
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

  const getCurrentProvince = () => {
    let result = '';
    Object.keys(provinceCodeMapping).forEach((provinceName) => {
      if (provinceCodeMapping[provinceName] === selectedProvince) {
        result = provinceName;
      }
    });
    return result;
  };

  return (
    <div className={c.pageContainer}>
      <BounceLoader
        exitCondition={
          report.loadingState === 'complete' && lastDays.length != 0
        }
        className={c.bounceLoader}
      />
      <AppBar />
      <Grid spacing={3} container direction="row" justify="center" item>
        <SwitchProvider>
          <SimpleMenu />
        </SwitchProvider>
        {currentEndpoint != 'reports' && lastDays.length != 0 ? (
          <React.Fragment>
            <Grid item md={4} sm={6} xs={12}>
              <SwitchProvider>
                <SummaryCard
                  title="Total Cases"
                  amount={currentProvinceData.total_cases}
                  secondaryAmount={currentProvinceData.change_cases}
                  description={`Total number of positive COVID-19 cases in Canada ${getCurrentProvince()}`}
                  toggleRequired={true}
                  toggledAmount={
                    currentProvinceData.total_cases -
                    currentProvinceData.total_fatalities -
                    currentProvinceData.total_recoveries
                  }
                  secondaryToggleAmount={
                    currentProvinceData.total_cases -
                    currentProvinceData.total_fatalities -
                    currentProvinceData.total_recoveries -
                    (lastDays[5].total_cases -
                      lastDays[5].total_fatalities -
                      lastDays[5].total_recoveries)
                  }
                  toggledDescription={`Total number of active COVID-19 cases in ${getCurrentProvince()}`}
                  toggleTo="Active Cases"
                >
                  <Switch />
                  <DropDown
                    days={lastDays}
                    isCases={true}
                    info="total_cases"
                    secondaryInfo="change_cases"
                  />
                </SummaryCard>
              </SwitchProvider>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SummaryCard
                title="Total Fatalities"
                amount={currentProvinceData.total_fatalities}
                secondaryAmount={currentProvinceData.change_fatalities}
                description={`Total number of deaths due to COVID-19 in ${getCurrentProvince()}`}
              >
                <React.Fragment />
                <DropDown
                  days={lastDays}
                  isCases={true}
                  info="total_fatalities"
                  secondaryInfo="change_fatalities"
                />
              </SummaryCard>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SummaryCard
                title="Total Tests"
                amount={currentProvinceData.total_tests}
                secondaryAmount={currentProvinceData.change_tests}
                description={`Total number of COVID-19 tests done in ${getCurrentProvince()}`}
              >
                <DropDown
                  days={lastDays}
                  isCases={true}
                  info="total_tests"
                  secondaryInfo="change_tests"
                />
              </SummaryCard>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SwitchProvider>
                <SummaryCard
                  title="Total Hospitalizations"
                  amount={currentProvinceData.total_hospitalizations}
                  secondaryAmount={currentProvinceData.change_hospitalizations}
                  description="Total number of COVID-19 patients hospitalized in Canada"
                  toggleRequired={true}
                  toggledAmount={currentProvinceData.total_criticals}
                  secondaryToggleAmount={currentProvinceData.change_criticals}
                  toggledDescription={`Total number of COVID patients in critical conditions in ${getCurrentProvince()}`}
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
                amount={currentProvinceData.total_recoveries}
                secondaryAmount={currentProvinceData.change_recoveries}
                description={`Total number of COVID-19 recoveries in ${getCurrentProvince()}`}
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
                amount={currentProvinceData.total_vaccinations}
                secondaryAmount={currentProvinceData.change_vaccinations}
                description={`Total number of COVID-19 vaccination doses given in Canada${getCurrentProvince()}`}
              >
                <React.Fragment />
                <DropDown
                  days={lastDays}
                  info="total_vaccinations"
                  secondaryInfo="change_vaccinations"
                />
              </SummaryCard>
            </Grid>
            <Grid item lg={6} xs={12}>
              <CumulativeChart />
            </Grid>
            <Grid item lg={6} xs={12}>
              <ProvinceDailyChart />
            </Grid>
          </React.Fragment>
        ) : (
          <div className={c.substitutePage}>
            <Typography>SELECT A PROVINCE YOU MUPPET</Typography>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default ProvincePage;
