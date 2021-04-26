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
  teal,
} from '@material-ui/core/colors';

const dataFields = [
  {
    label: 'New Cases',
    data: [],
    borderColor: red[500],
    backgroundColor: red[300],
    fill: true,
    fieldName: 'change_cases',
  },
  {
    label: 'New Deaths',
    borderColor: pink[500],
    data: [],
    backgroundColor: pink[300],
    hidden: true,
    fill: true,
    fieldName: 'change_fatalities',
  },
  {
    label: 'New Hospitalizations',
    borderColor: purple[500],
    backgroundColor: purple[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_hospitalizations',
  },
  {
    label: 'New Criticals',
    borderColor: indigo[500],
    backgroundColor: indigo[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_criticals',
  },
  {
    label: 'New Tests',
    borderColor: blue[500],
    backgroundColor: blue[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_tests',
  },
  {
    label: 'New Recoveries',
    borderColor: cyan[500],
    backgroundColor: cyan[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_recoveries',
  },
  {
    label: 'New Vaccinations',
    borderColor: teal[500],
    backgroundColor: teal[300],
    data: [],
    hidden: true,
    fill: true,
    fieldName: 'change_vaccinations',
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
