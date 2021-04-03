import React from 'react';
import BaseChart from '../components/BaseChart';
import { useReport } from '../context/ReportContext';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import moment from 'moment';

const dataFields = [
  {
    label: 'New Cases',
    data: [],
    borderColor: '#264653',
    backgroundColor: '#3A6B7E',
    fill: true,
    fieldName: 'change_cases',
  },
  {
    label: 'New Deaths',
    borderColor: '#2a9d8f',
    data: [],
    backgroundColor: '#3ECCBB',
    hidden: true,
    fill: true,
    fieldName: 'change_fatalities',
  },
  {
    label: 'New Tests',
    borderColor: '#f4a261',
    backgroundColor: '#F8C8A0',
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_tests',
  },
  {
    label: 'New Recoveries',
    borderColor: '#e76f51',
    backgroundColor: '#F0A693',
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_recoveries',
  },
];

const DailyChart = ({ children, ...rest }) => {
  const { report } = useReport();
  const [chartDataSet, setChartDataSet] = useState(dataFields);
  const [chartXAxes, setChartXAxes] = useState([]);

  useEffect(() => {
    if (report.dataPoints.length > 0) {
      setChartXAxes([
        {
          type: 'category',
          labels: report.dataPoints.map((report) =>
            moment(report.date).format('MMM DD, YY')
          ),
          ticks: {
            beginAtZero: true,
            autoSkipPadding: 30,
          },
        },
      ]);
      setChartDataSet((prevChartDataSet) => {
        const newChartDataSet = cloneDeep(prevChartDataSet);
        return newChartDataSet.map((dataSet) => {
          const { fieldName } = dataSet;
          dataSet.data = report.dataPoints.map((p) => {
            return {
              x: moment(p.date).format('MMM DD, YY'),
              y: p[fieldName] || 0,
            };
          });
          console.log(dataSet.data);
          return dataSet;
        });
      });
    }
  }, [report.dataPoints]);

  return (
    <BaseChart
      type="line"
      data={report}
      chartDataset={chartDataSet}
      chartXAxes={chartXAxes}
      title="Daily Change Chart"
      {...rest}
    >
      {children}
    </BaseChart>
  );
};

export default DailyChart;
