/* eslint-disable func-names */
import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import * as _ from 'lodash';
import {
  Chart as ChartJS,
  registerables,
  BarController,
  BarElement,
  LinearScale,
} from 'chart.js';
import { generateDataBarChart } from './handler';

ChartJS.register(...registerables, BarController, BarElement, LinearScale);

const BarChart = (data) => {
  const dataChart = {
    datasets: [
      {
        data: generateDataBarChart(data) || [],
        backgroundColor: '#6399E0',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },

    maintainAspectRatio: false,
    responsive: true,

    scales: {
      y: {
        min: 0,
        max: 60,
        ticks: {
          stepSize: 20,
        },
        grid: {
          borderDash: [2, 2],
          drawBorder: true,
          borderColor: 'rgba(230, 233, 235, 1)',
        },
      },
      x: {
        // stacked: true,
        grid: {
          borderDash: [2, 2],
          drawBorder: true,
          borderColor: 'rgba(230, 233, 235, 1)',
        },
        type: 'time',
        time: {
          stepSize: 4,
          unit: 'hour',
        },
        min: data.data.fromTime,
        max: data.data.endTime,
      },
    },
  };

  return <Bar datasetIdKey="id" data={dataChart} options={options} />;
};

export default memo(BarChart);
