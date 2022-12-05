/* eslint-disable func-names */
/* eslint-disable react/forbid-prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  registerables,
  BarController,
  BarElement,
  LinearScale,
} from 'chart.js';
import { externalTooltipHandlerBubble, tooltipLine } from './handler';

ChartJS.register(...registerables, BarController, BarElement, LinearScale);


const BubbleChart = (props) => {
  const { datasets, xAxis, yAxis } = props;

  Tooltip.positioners.myCustomPositioner = function (items) {
    const pos = Tooltip.positioners.average(items);

    if (pos === false) {
      return false;
    }
    const { chart } = this;

    return {
      x: pos.x,
      y: chart.chartArea.top,
      xAlign: 'center',
      yAlign: 'top',
    };
  };

  const delta = Math.ceil((yAxis?.yMax - yAxis?.yMin) / 3 / 10) * 10;

  const dataChart = {
    datasets: [
      {
        id: 0,
        data: datasets?.dataAvgs,
        backgroundColor: '#EF2641',
      },
    ],
  };

  const options = {
    interaction: {
      intersect: false,
      mode: 'index',
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
        position: 'myCustomPositioner',
        external: externalTooltipHandlerBubble,
      },
    },

    maintainAspectRatio: false,
    responsive: true,

    scales: {
      y: {
        min: yAxis?.yMin,
        max: yAxis?.yMin + delta * 3,
        ticks: {
          stepSize: delta,
        },
        grid: {
          borderDash: [2, 2],
          drawBorder: true,
          borderColor: 'rgba(230, 233, 235, 1)',
        },
      },
      x: {
        grid: {
          borderDash: [2, 2],
          drawBorder: true,
          borderColor: 'rgba(230, 233, 235, 1)',
        },
        type: 'time',
        time: {
          stepSize: 15,
          unit: 'minute',
        },
        min: xAxis?.xMin,
        max: xAxis?.xMax,
      },
    },
  };

  return (
    <Bubble
      datasetIdKey="id"
      data={dataChart}
      options={options}
      plugins={[tooltipLine]}
    />
  );
};

BubbleChart.defaultProps = {
  datasets: {},
  xAxis: {},
  yAxis: {},
};

BubbleChart.propTypes = {
  datasets: PropTypes.object,
  xAxis: PropTypes.object,
  yAxis: PropTypes.object,
};


export default memo(BubbleChart);
