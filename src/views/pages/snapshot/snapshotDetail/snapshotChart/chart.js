/* eslint-disable react/forbid-prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { de } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';

ChartJS.register(...registerables);

const Chart = (props) => {
  const {
    dataI, dataII, dataIII,
  } = props;

  const widthLineX = (ctx) => {
    if (ctx.tick.value % 250 === 0) {
      return '0.9';
    }
    if (ctx.tick.value % 25 === 0) {
      return '0.4';
    }
    return '0.2';
  };

  const widthLineY = (ctx) => {
    if (ctx.tick.value % 2.5) {
      return '0.2';
    }
    return '0.9';
  };

  const dataChart = {
    datasets: [
      {
        id: 1,
        data: dataII,
        borderWidth: 1,
        borderColor: '#000',
        tension: 0.5,
      },
      {
        id: 2,
        data: dataI,
        borderWidth: 1,
        borderColor: '#000',
        tension: 0.5,
      },
      {
        id: 3,
        data: dataIII,
        borderWidth: 1,
        borderColor: '#000',
        tension: 0.5,
      },
    ],
  };

  const options = {
    adapters: {
      date: {
        locale: de,
      },
    },
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

    // Point
    pointBorderWidth: 0,
    pointBackgroundColor: 'rgba(220,220,220,0)',

    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: -20,
        max: 20,
        type: 'linear',
        position: 'left',
        stack: 'demo',
        stackWeight: 1,
        ticks: {
          display: false,
          maxTicksLimit: 500,
          stepSize: 0.5,
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderColor: 'rgba(230, 233, 235, 0.6)',
          lineWidth: ctx => widthLineY(ctx),
        },
      },
      x: {
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderColor: 'rgba(230, 233, 235, 0.6)',
          lineWidth: ctx => widthLineX(ctx),
        },
        ticks: {
          stepSize: 25,
          maxTicksLimit: dataI.length / 25,
          backdropPadding: 1,
          display: true,
          callback(value) {
            if (value % 250 === 0) {
              return `${Math.floor(value / 15000)}:${Math.floor(value / 250 % 60)
                .toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}`;
            }
            return '';
          },
        },
        type: 'linear',
      },
    },
  };

  return (
    <Line
      datasetIdKey="id"
      data={dataChart}
      options={options}
    />
  );
};

Chart.defaultProps = {
  dataI: [],
  dataII: [],
  dataIII: [],
};

Chart.propTypes = {
  dataI: PropTypes.array,
  dataII: PropTypes.array,
  dataIII: PropTypes.array,
};


export default memo(Chart);
