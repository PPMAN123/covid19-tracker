import React from 'react'
import BaseChart from '../components/BaseChart'
import { useProvinces } from '../context/ProvinceContext'
import { useEffect, useState } from 'react' 
import {cloneDeep} from 'lodash'

const dataFields = [
    {
        label: 'Cases',
        data: [],
        borderColor: '#000000',
        backgroundColor: '#000000',
        fieldName: 'total_cases'
    },
    {
        label: 'Recoveries',
        data: [],
        borderColor: '#893168',
        backgroundColor: '#893168',
        fieldName: 'total_recoveries',
        hidden: true
    },
    {
        label: 'Deaths',
        data: [],
        borderColor: '#1098F7',
        backgroundColor: '#1098F7',
        fieldName: 'total_fatalities',
        hidden: true
    },
    {
        label: 'Hospitalizations',
        data: [],
        borderColor: '#CCCCCC',
        backgroundColor: '#CCCCCC',
        fieldName: 'total_hospitalizations',
        hidden: true
    },
    {
        label: 'Tests',
        data: [],
        borderColor: '#B89E97',
        backgroundColor: '#B89E97',
        fieldName: 'total_tests',
        hidden: true
    }
]

const ProvinceComparisonChart = ({children, ...rest}) => {
    const { province, provinceCodeMapping } = useProvinces()
    const [chartDataSet, setChartDataSet] = useState(dataFields)
    const [chartXAxes, setChartXAxes] = useState([])

    useEffect(() => {
        if(province.dataPoints.length > 0){
            const sortedProvinces = province.dataPoints.sort((a,b) => b.total_cases - a.total_cases )
            setChartXAxes([{
                type: 'category',
                labels: sortedProvinces.map(p => provinceCodeMapping[p.province])
            }])
            setChartDataSet(prevChartDataSet =>{
                const newChartDataSet = cloneDeep(prevChartDataSet);
                return newChartDataSet.map(dataSet => {
                    const { fieldName } = dataSet;
                    dataSet.data = sortedProvinces.map(p => {
                        return {
                            x: provinceCodeMapping[p.province],
                            y: p[fieldName]
                        }
                    })
                    return dataSet;
                })
            })
        }
    }, [province])

    return (
        <BaseChart
            type='bar'
            data={province}
            chartDataset={chartDataSet}
            chartXAxes={chartXAxes}
            title='Stats by Province'
            {...rest}
        >
            {children}
        </BaseChart>
    )
}

export default ProvinceComparisonChart