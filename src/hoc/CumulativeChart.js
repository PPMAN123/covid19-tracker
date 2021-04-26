import React from 'react';
import BaseChart from '../components/BaseChart';
import { useReport } from '../context/ReportContext';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import {
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
} from '@material-ui/core/colors';

const dataFields = [
  {
    label: 'Total Cases',
    data: [],
    borderColor: red[500],
    backgroundColor: red[300],
    fill: true,
    fieldName: 'total_cases',
  },
  {
    label: 'Total Deaths',
    borderColor: pink[500],
    backgroundColor: pink[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'total_fatalities',
  },
  {
    label: 'Total Hospitalizations',
    borderColor: purple[500],
    backgroundColor: purple[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'total_hospitalizations',
  },
  {
    label: 'Total Tests',
    borderColor: indigo[500],
    backgroundColor: indigo[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'total_tests',
  },
  {
    label: 'Total Recoveries',
    borderColor: blue[500],
    backgroundColor: blue[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'total_recoveries',
  },
  {
    label: 'Total Vaccinations',
    borderColor: cyan[500],
    backgroundColor: cyan[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'total_vaccinations',
  },
];

const CumulativeChart = ({ children, ...rest }) => {
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
              y: p[fieldName],
            };
          });
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
      title="Cumulative Chart"
      {...rest}
    >
      {children}
    </BaseChart>
  );
};

export default CumulativeChart;
