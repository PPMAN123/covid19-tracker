import React from 'react'
import { useSummary } from '../context/SummaryContext'
import SummaryCard from '../components/SummaryCard'
import { Grid, makeStyles } from '@material-ui/core'
import BounceLoader from '../components/BounceLoader'
import CumulativeChart from '../components/CumulativeChart'

const useStyles = makeStyles({
    container:{
        transition: 'opacity 0.5s ease',
    },
    beforeLoading: {
        opacity: 0
    },
    afterLoading:{
        opacity: 1
    }
});

const HomePage = () => {
    const { summary } = useSummary()
    const c = useStyles();
    return (
        <React.Fragment>
            <BounceLoader exitCondition={summary.loadingState === "complete"} />
            <Grid spacing={3} container direction="column" justify="center" className={`${c.container} ${summary.loadingState === "complete"? c.afterLoading : c.beforeLoading}`} >
                <Grid spacing={3} container direction="row" justify="center" item >
                    <Grid item>
                        <SummaryCard title="Total Cases" amount={summary.total_cases} secondaryAmount={summary.change_cases} description="Total number of positive cases in Canada" />
                    </Grid>
                    <Grid item>
                        <SummaryCard title="Total Fatalities" amount={summary.total_fatalities} secondaryAmount={summary.change_fatalities} description="Total number of deaths due to Covid-19 in Canada" />
                    </Grid>
                    <Grid item>
                        <SummaryCard title="Total Tests" amount={summary.total_tests} secondaryAmount={summary.change_tests} description="Total number of Covid-19 tests done in Canada" />
                    </Grid>
                </Grid>
                <Grid spacing={3} container direction="row" justify="center" item >
                    <Grid item>
                        <SummaryCard title="Total Hospitalizations" amount={summary.total_hospitalizations} secondaryAmount={summary.change_hospitalizations} description="Total number of people hospitalized in Canada" />
                    </Grid>
                    <Grid item>
                        <SummaryCard title="Total Recoveries" amount={summary.total_recoveries} secondaryAmount={summary.change_recoveries} description="Total number of Covid-19 recoveries in Canada"/>
                    </Grid>
                    <Grid item>
                        <SummaryCard title="Total Criticals" amount={summary.total_criticals} secondaryAmount={summary.change_criticals} description="Total number of people in critical conditions in Canada"/>
                    </Grid>
                </Grid>
            </Grid>
            <CumulativeChart/>
        </React.Fragment>
    )
}

export default HomePage
