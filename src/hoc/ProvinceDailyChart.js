import React from 'react';
import BaseChart from '../components/BaseChart';
import { useReport } from '../context/ReportContext';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import moment from 'moment';

const dataFields = [
  {
    label: 'Daily new cases',
    data: [],
    borderColor: '#264653',
    backgroundColor: '#3A6B7E',
    fill: true,
    fieldName: 'change_cases',
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
      title="Daily Change Cases"
      {...rest}
    >
      {children}
    </BaseChart>
  );
};

export default CumulativeChart;
