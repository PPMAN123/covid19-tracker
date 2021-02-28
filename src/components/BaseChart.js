import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { Card, makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  cardContent: {
    width: '100%',
    position: 'relative',
    height: 400,
  },
});

const BaseChart = ({ type, chartDataset, chartXAxes, title }) => {
  const chart = useRef();
  const [ctx, setCtx] = useState(null);
  const c = useStyles();
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    setCtx(chart.current);
  }, []);

  useEffect(() => {
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      setChartInstance(
        new Chart(ctx, {
          type: type,
          data: {
            datasets: chartDataset,
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: true,
              text: title,
              fontSize: 18,
            },
            elements: {
              point: {
                radius: 1.5,
              },
            },
            scales: {
              xAxes: chartXAxes,
            },
          },
        })
      );
    }
  }, [ctx, chartDataset, chartXAxes, type]);

  return (
    <Card className={c.cardContent}>
      <canvas ref={chart} />
    </Card>
  );
};

export default BaseChart;
