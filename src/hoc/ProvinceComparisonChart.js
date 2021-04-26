import React from 'react';
import BaseChart from '../components/BaseChart';
import { useProvinces } from '../context/ProvinceContext';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
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
    label: 'Total Cases',
    data: [],
    borderColor: red[300],
    backgroundColor: red[500],
    fieldName: 'total_cases',
  },
  {
    label: 'Total Recoveries',
    data: [],
    borderColor: pink[300],
    backgroundColor: pink[500],
    fieldName: 'total_recoveries',
    hidden: true,
  },
  {
    label: 'Total Deaths',
    data: [],
    borderColor: purple[300],
    backgroundColor: purple[500],
    fieldName: 'total_fatalities',
    hidden: true,
  },
  {
    label: 'Total Hospitalizations',
    data: [],
    borderColor: indigo[300],
    backgroundColor: indigo[500],
    fieldName: 'total_hospitalizations',
    hidden: true,
  },
  {
    label: 'Total Criticals',
    data: [],
    borderColor: blue[300],
    backgroundColor: blue[500],
    fieldName: 'total_criticals',
    hidden: true,
  },
  {
    label: 'Total Tests',
    data: [],
    borderColor: cyan[300],
    backgroundColor: cyan[500],
    fieldName: 'total_tests',
    hidden: true,
  },
  {
    label: 'Total Vaccinations',
    data: [],
    borderColor: teal[300],
    backgroundColor: teal[500],
    fieldName: 'total_vaccinations',
    hidden: true,
  },
];

const ProvinceComparisonChart = ({ children, ...rest }) => {
  const { province, provinceCodeMapping } = useProvinces();
  const [chartDataSet, setChartDataSet] = useState(dataFields);
  const [chartXAxes, setChartXAxes] = useState([]);

  useEffect(() => {
    if (province.dataPoints.length > 0) {
      const sortedProvinces = province.dataPoints.sort(
        (a, b) => b.total_cases - a.total_cases
      );
      setChartXAxes([
        {
          type: 'category',
          labels: sortedProvinces.map((p) => provinceCodeMapping[p.province]),
        },
      ]);
      setChartDataSet((prevChartDataSet) => {
        const newChartDataSet = cloneDeep(prevChartDataSet);
        return newChartDataSet.map((dataSet) => {
          const { fieldName } = dataSet;
          dataSet.data = sortedProvinces.map((p) => {
            return {
              x: provinceCodeMapping[p.province],
              y: p[fieldName],
            };
          });
          return dataSet;
        });
      });
    }
  }, [province]);

  return (
    <BaseChart
      type="bar"
      data={province}
      chartDataset={chartDataSet}
      chartXAxes={chartXAxes}
      title="Stats by Province"
      {...rest}
    >
      {children}
    </BaseChart>
  );
};

export default ProvinceComparisonChart;
