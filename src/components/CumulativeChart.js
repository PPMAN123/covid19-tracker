import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
import { Card, CardContent, makeStyles, rgbToHex } from '@material-ui/core'
import { useReport } from '../context/ReportContext'
import moment from 'moment'
import { green, grey, purple, red } from '@material-ui/core/colors'

const useStyles = makeStyles({
    cardContent : {
        width:1000,
        height:500
    }
})

const CumulativeChart = () => {

    const chart = useRef();
    const [ctx, setCtx] = useState(null);
    const c = useStyles()
    const { report } = useReport()

    useEffect(() =>{
        setCtx(chart.current);
    },[])
    
    useEffect(() => {
        if(ctx && report.dataPoints.length > 0){
            const dates = report.dataPoints.map(report => moment(report.date).format("MMM DD, YY"))
            const caseSet = report.dataPoints.map(report =>{
                return{
                    x: moment(report.date).format("MMM DD, YY"),
                    y: report.total_cases
                }
            })
            const deathSet = report.dataPoints.map(report =>{
                return{
                    x: moment(report.date).format("MMM DD, YY"),
                    y: report.total_fatalities
                }
            })
            const testSet = report.dataPoints.map(report =>{
                return{
                    x: moment(report.date).format("MMM DD, YY"),
                    y: report.total_tests
                }
            })
            const hospitalizationSet = report.dataPoints.map(report =>{
                return{
                    x: moment(report.date).format("MMM DD, YY"),
                    y: report.total_hospitalizations
                }
            })
            const recoverySet = report.dataPoints.map(report =>{
                return{
                    x: moment(report.date).format("MMM DD, YY"),
                    y: report.total_recoveries
                }
            })
            const myChart = new Chart(ctx, {
                type: 'line',
                data:{
                    datasets: [
                        {
                            label: 'Total Cases',
                            data: caseSet,
                            borderColor:'#264653',
                            backgroundColor: '#264653',
                            fill: false,
                        },
                        {
                            label: 'Total Deaths',
                            borderColor: '#2a9d8f',
                            data: deathSet,
                            backgroundColor: '#2a9d8f',
                            hidden: true,
                            fill: false,
                        },
                        {
                            label: 'Total Hospitalizations',
                            borderColor: '#e9c46a',
                            backgroundColor: '#e9c46a',
                            data: hospitalizationSet,
                            hidden: true,
                            fill: false,
                        },
                        {
                            label: 'Total Tests',
                            borderColor: '#f4a261',
                            backgroundColor: '#f4a261',
                            data: testSet,
                            hidden: true,
                            fill: false,
                        },
                        {
                            label: 'Total Recoveries',
                            borderColor: '#e76f51',
                            backgroundColor: '#e76f51',
                            data: recoverySet,
                            hidden: true,
                            fill: false,
                        }
                    ],
                },
                options:{
                    elements: {
                        point:{
                            radius: 1.5
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'category',
                            labels: dates,
                            ticks: {
                                beginAtZero: true,
                                autoSkipPadding: 30
                            }
                        }]
                    }
                }
            })
        }
    }, [ctx, report])

    return (
        <Card className={c.cardContent} >
            <CardContent  >
                <canvas ref={chart} ></canvas>
            </CardContent>
        </Card>
    )
}

export default CumulativeChart
