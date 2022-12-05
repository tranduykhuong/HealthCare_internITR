/* eslint-disable func-names */
/* eslint-disable react/forbid-prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, Tooltip } from 'chart.js';
import { de } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { externalTooltipHandler, tooltipLine } from './handler';


ChartJS.register(...registerables);

const LineChart = (props) => {
  const {
    datasets, tension, point, xAxis, yAxis,
  } = props;


  const lastPoint = ctx => !point.lastPoint || (ctx.dataIndex === datasets?.dataAvgs.length - 1 ? 1 : 0);
  const skipped = (ctx, value) => (ctx.p0.skip || ctx.p1.skip ? value : undefined);
  const down = (ctx, value) => (ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined);

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

  // const delta = yAxis?.yMax - yAxis?.yMin >= 160 ? 65 : 60;
  const delta = (Math.ceil((yAxis?.yMax - yAxis?.yMin) / 5 / 3) + 1) * 5;

  const dataChart = {
    datasets: [
      {
        id: 1,
        data: datasets?.dataAvgs,
        borderColor: ['#EF2641'],
        borderWidth: 1.5,
        tension,
        pointHoverBorderWidth: 0,

        // Dash line
        spanGaps: true,
        segment: {
          borderColor: ctx => skipped(ctx, 'rgba(239, 38, 65, 0.3)') || down(ctx, '#EF2641'),
          borderDash: ctx => skipped(ctx, [4, 4]),
        },
        pointBorderWidth: ctx => lastPoint(ctx),
      },
      {
        id: 2,
        data: datasets?.dataMaxs,
        borderWidth: 0,
        tension: 0.6,
        backgroundColor: 'rgba(239, 38, 65, 0.2)',
        fill: +2,
        pointHoverBorderWidth: 0,
      },
      {
        id: 3,
        data: datasets?.dataMins,
        borderWidth: 0,
        tension: 0.6,
        pointHoverBorderWidth: 0,
      },
    ],
  };

  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
        position: 'myCustomPositioner',
        external: externalTooltipHandler,
      },
    },

    // Point
    pointBorderWidth: point?.pointBorderWidth || '1',
    pointBorderColor: '#EF2641',
    pointBackgroundColor: point?.pointBackgroundColor || 'rgba(220,220,220,0)',

    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: delta,
        },
        grid: {
          borderDash: [2, 2],
          drawBorder: true,
          borderColor: 'rgba(230, 233, 235, 1)',
        },
        min: yAxis?.yMin,
        max: yAxis?.yMin + delta * 3,
      },
      x: {
        grid: {
          borderDash: [2, 2],
          drawBorder: true,
          borderColor: 'rgba(230, 233, 235, 1)',
        },
        type: xAxis?.type,
        time: {
          stepSize: xAxis?.time?.stepSize,
          unit: xAxis?.time?.unit,
          displayFormats: xAxis?.time?.displayFormats || {
            hour: 'h a',
          },
        },
        min: xAxis?.xMin,
        max: xAxis?.xMax,
      },
    },
  };

  return (
    <>
      <Line
        datasetIdKey="id"
        data={dataChart}
        options={options}
        plugins={[tooltipLine]}
      />
    </>
  );
};

LineChart.defaultProps = {
  datasets: {},
  tension: '0',
  point: {},
  xAxis: {},
  yAxis: {},
};

LineChart.propTypes = {
  datasets: PropTypes.object,
  tension: PropTypes.string,
  point: PropTypes.object,
  xAxis: PropTypes.object,
  yAxis: PropTypes.object,
};


export default memo(LineChart);
