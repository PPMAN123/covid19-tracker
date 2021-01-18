import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
import { Card, CardContent, makeStyles, rgbToHex } from '@material-ui/core'
import { useReport } from '../context/ReportContext'
import moment from 'moment'
import { green, grey, purple, red } from '@material-ui/core/colors'

const useStyles = makeStyles({
    cardContent : {
        width:500   ,
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
                    y: report.total_tests
                }
            })
            const recoverySet = report.dataPoints.map(report =>{
                return{
                    x: moment(report.date).format("MMM DD, YY"),
                    y: report.recoveries
                }
            })
            const myChart = new Chart(ctx, {
                type: 'line',
                data:{
                    datasets: [
                        {
                            label: 'Total Cases',
                            data: caseSet,
                            backgroundColor:'red',
                            fill: false,
                        },
                        {
                            label: 'Total Deaths',
                            backgroundColor: 'grey',
                            data: deathSet,
                            fill: false,
                        },
                        {
                            label: 'Total Hospitalizations',
                            backgroundColor: 'purple',
                            data: hospitalizationSet,
                            fill: false,
                        },
                        {
                            label: 'Total Tests',
                            backgroundColor: 'purple',
                            data: testSet,
                            fill: false,
                        },
                        {
                            label: 'Total Recoveries',
                            backgroundColor: 'blue',
                            data: recoverySet,
                            fill: false,
                        }
                    ],
                },
                options:{
                    scales: {
                        xAxes: [{
                            type: 'category',
                            labels: dates,
                            ticks: {
                                beginAtZero: true,
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
                <canvas width="400" height="400" ref={chart} ></canvas>
            </CardContent>
        </Card>
    )
}

export default CumulativeChart
