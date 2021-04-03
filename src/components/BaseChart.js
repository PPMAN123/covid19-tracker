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
            bezierCurve: false,
            datasetFill: true,
            showLines: true,
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: true,
              text: title,
              fontSize: 18,
            },
            elements: {
              point: {
                radius: 0,
                hitRadius: 4,
                hoverRadius: 4,
              },
            },
            scales: {
              xAxes: chartXAxes,
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    suggestedMin: 0,
                  },
                },
              ],
            },
            hover: {
              intersect: false,
            },
            tooltips: {
              intersect: false,
            },
            pan: {
              enabled: true,
              mode: 'xy',
              rangeMin: {
                x: null,
                y: null,
              },
              rangeMax: {
                x: null,
                y: null,
              },
            },
            zoom: {
              enabled: true,
              mode: 'xy',
              rangeMin: {
                x: null,
                y: null,
              },
              rangeMax: {
                x: null,
                y: null,
              },
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
