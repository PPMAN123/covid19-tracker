import React, { Component } from 'react'
import { SummaryProvider, useSummary } from '../context/SummaryContext'
import styled from 'styled-components'
import SummaryCard from '../components/SummaryCard'
import { Grid } from '@material-ui/core'

const HomePage = () => {
    const { summary } = useSummary()
    return (
        <Grid spacing={3} container direction="column" justify="center">
            <Grid spacing={3} container direction="row" justify="center" item>
                <Grid item>
                    <SummaryCard title="Total Cases" amount={summary.total_cases} description="Total number of positive cases in Canada" />
                </Grid>
                <Grid item>
                    <SummaryCard title="Total Fatalities" amount={summary.total_fatalities} description="Total number of deaths due to Covid-19 in Canada" />
                </Grid>
                <Grid item>
                    <SummaryCard title="Total Tests" amount={summary.total_tests} description="Total number of Covid-19 tests done in Canada" />
                </Grid>
            </Grid>
                <Grid spacing={3} container direction="row" justify="center" item>
                <Grid item>
                    <SummaryCard title="Total Hospitalizations" amount={summary.total_hospitalizations} description="Total number of people hospitalized in Canada" />
                </Grid>
                <Grid item>
                    <SummaryCard title="Total Recoveries" amount={summary.total_recoveries} description="Total number of Covid-19 recoveries in Canada" />
                </Grid>
                <Grid item>
                    <SummaryCard title="Total Criticals" amount={summary.total_criticals} description="Total number of people in critical conditions in Canada" />
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default HomePage
