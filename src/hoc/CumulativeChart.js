import React from 'react'
import BaseChart from '../components/BaseChart'
import { useReport } from '../context/ReportContext'
import { useEffect, useState } from 'react' 
import {cloneDeep} from 'lodash'
import moment from 'moment'

const dataFields = [
    {
        label: 'Total Cases',
        data: [],
        borderColor:'#264653',
        backgroundColor: '#264653',
        fill: false,
        fieldName: 'total_cases'
    },
    {
        label: 'Total Deaths',
        borderColor: '#2a9d8f',
        data: [],
        backgroundColor: '#2a9d8f',
        hidden: true,
        fill: false,
        fieldName: 'total_fatalities'
    },
    {
        label: 'Total Hospitalizations',
        borderColor: '#e9c46a',
        backgroundColor: '#e9c46a',
        data: [],
        hidden: true,
        fill: false,
        fieldName: 'total_hospitalizations'
    },
    {
        label: 'Total Tests',
        borderColor: '#f4a261',
        backgroundColor: '#f4a261',
        data: [],
        hidden: true,
        fill: false,
        fieldName: 'total_tests'
    },
    {
        label: 'Total Recoveries',
        borderColor: '#e76f51',
        backgroundColor: '#e76f51',
        data: [],
        hidden: true,
        fill: false,
        fieldName: 'total_revoceries'
    }
]

const CumulativeChart = ({children, ...rest}) => {
    const { report, setReports } = useReport()
    const [chartDataSet, setChartDataSet] = useState(dataFields)
    const [chartXAxes, setChartXAxes] = useState([])

    useEffect(() => {
        if(report.dataPoints.length > 0){
            setChartXAxes([{
                type: 'category',
                labels: report.dataPoints.map(report => moment(report.date).format("MMM DD, YY")),
                ticks: {
                    beginAtZero: true,
                    autoSkipPadding: 30
                }
            }])
            setChartDataSet(prevChartDataSet =>{
                const newChartDataSet = cloneDeep(prevChartDataSet);
                return newChartDataSet.map(dataSet => {
                    const { fieldName } = dataSet;
                    dataSet.data = report.dataPoints.map(p => {
                        return {
                            x: report.dataPoints.map(report => moment(report.date).format("MMM DD, YY")),
                            y: p[fieldName]
                        }
                    })
                    return dataSet;
                })
            })
        }
    }, [report])

    return (
        <BaseChart
            type='line'
            data={report}
            chartDataset={chartDataSet}
            chartXAxes={chartXAxes}
            {...rest}
        >
            {children}
        </BaseChart>
    )
}

export default CumulativeChart