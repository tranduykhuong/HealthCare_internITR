import moment from 'moment';
import * as _ from 'lodash';

export const generateDataChart = (data, duration) => {
  const dataAvgs = [];
  const dataMins = [];
  const dataMaxs = [];
  let yMin = 120;
  let yMax = 10;

  if (data?.avgs && data?.avgs.length) {
    let step = data?.avgs[0].time;
    yMin = data?.mins[0].value;
    yMax = data?.maxs[0].value;

    for (let i = 0; i < data?.avgs.length; i += 1) {
      while (step < data?.avgs[i].time) {
        dataAvgs.push({ x: step, y: NaN });
        dataMins.push({ x: step, y: NaN });
        dataMaxs.push({ x: step, y: NaN });
        if (duration === 'Hour') {
          step = moment(step).add(1, 'm').valueOf();
        } else if (duration === 'Day') {
          step = moment(step).add(30, 'm').valueOf();
        } else if (duration === 'Week') {
          step = moment(step).add(6, 'h').valueOf();
        } else if (duration === 'Month') {
          step = moment(step).add(1, 'd').valueOf();
        } else if (duration === 'Year') {
          step = moment(step).add(1, 'month').valueOf();
        }
      }
      if (step > data?.avgs[i].time) { break; }
      if (data?.avgs[i].time === step) {
        dataAvgs.push({ x: data?.avgs[i].time, y: data?.avgs[i].value });
        dataMins.push({ x: data?.mins[i].time, y: data?.mins[i].value });
        dataMaxs.push({ x: data?.maxs[i].time, y: data?.maxs[i].value });
        yMin = Math.min(yMin, data?.mins[i].value);
        yMax = Math.max(yMax, data?.maxs[i].value);
        if (duration === 'Hour') {
          step = moment(step).add(1, 'm').valueOf();
        } else if (duration === 'Day') {
          step = moment(step).add(30, 'm').valueOf();
        } else if (duration === 'Week') {
          step = moment(step).add(6, 'h').valueOf();
        } else if (duration === 'Month') {
          step = moment(step).add(1, 'd').valueOf();
        } else if (duration === 'Year') {
          step = moment(step).add(1, 'month').valueOf();
        }
      }
    }
  }
  yMin = parseInt(Math.min(yMin - 10, 40) / 10, 10) * 10;
  yMax = Math.max(yMax + 10, 130);
  return {
    dataAvgs, dataMins, dataMaxs, yMin, yMax,
  };
};

export const generateDataBarChart = data => _.map(data?.data?.activity, e => ({ x: e.time, y: e.duration }));


const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = '#F0F2F5';
    tooltipEl.style.borderRadius = '20px';
    tooltipEl.style.color = '#EF2641';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, -12px)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.padding = '0px';

    const div = document.createElement('div');
    div.style.margin = '0px';
    div.style.padding = '0px';
    div.style.display = 'flex';
    div.style.justifyContent = 'space-around';

    tooltipEl.appendChild(div);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableRoot = tooltipEl.querySelector('div');
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = '#F0F2F5';
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginBottom = '0px';
      span.style.display = 'inline-block';
      span.style.padding = '0px';
      span.style.lineHeight = '12px';

      let text;
      if (i === 0) {
        span.style.minWidth = '48px';
        text = document.createTextNode(`${parseInt(+body, 10)} bpm`);
      } else {
        text = document.createTextNode(parseInt(+body, 10));
      }

      span.appendChild(text);
      tableRoot.appendChild(span);

      const iEle = document.createElement('i');
      iEle.style.fontSize = '10px';
      iEle.style.lineHeight = '10px';
      iEle.style.marginLeft = '4px';
      iEle.classList.add('fa');

      if (i === 1) {
        iEle.classList.add('fa-arrow-up');
      } else if (i === 2) {
        iEle.classList.add('fa-arrow-down');
      }
      tableRoot.appendChild(iEle);

      const p = document.createElement('p');
      p.style.background = colors.backgroundColor;
      p.style.borderColor = '#D2D4D6';
      p.style.borderWidth = '1px';
      p.style.borderRightStyle = 'solid';
      p.style.margin = '0px 6px';

      tableRoot.appendChild(p);
    });

    titleLines.forEach((title) => {
      const p = document.createElement('p');
      p.style.borderWidth = 0;
      p.style.marginBottom = '0px';
      p.style.color = '#696A6B';
      p.style.padding = '0px';
      p.style.lineHeight = '12px';
      p.style.minWidth = '156px';

      const text = document.createTextNode(title);

      p.appendChild(text);
      tableRoot.appendChild(p);
    });
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.fontSize = '30px';
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
  tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
};

export const externalTooltipHandlerBubble = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableRoot = tooltipEl.querySelector('div');
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    const arr = _.split(bodyLines[0], ', ');

    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = '#F0F2F5';
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginBottom = '0px';
      span.style.display = 'inline-block';
      span.style.padding = '0px';
      span.style.minWidth = '48px';
      span.style.lineHeight = '12px';

      let text;
      if (i === 0) {
        text = document.createTextNode(`${parseInt(+arr[3], 10)} bpm`);
      } else {
        text = document.createTextNode(parseInt(+arr[3], 10));
      }

      span.appendChild(text);
      tableRoot.appendChild(span);

      const iEle = document.createElement('i');
      iEle.style.fontSize = '10px';
      iEle.style.lineHeight = '10px';
      iEle.style.marginLeft = '4px';
      iEle.classList.add('fa');
      if (i === 1) {
        iEle.classList.add('fa-arrow-up');
      } else if (i === 2) {
        iEle.classList.add('fa-arrow-down');
      }
      tableRoot.appendChild(iEle);

      const p = document.createElement('p');
      p.style.background = '#F0F2F5';
      p.style.color = '#696A6B';
      p.style.lineHeight = '12px';
      p.style.margin = '0px 4px';
      text = document.createTextNode('at');

      p.appendChild(text);
      tableRoot.appendChild(p);
    });

    const p = document.createElement('p');
    p.style.borderWidth = 0;
    p.style.marginBottom = '0px';
    p.style.color = '#696A6B';
    p.style.padding = '0px';
    p.style.lineHeight = '12px';
    p.style.minWidth = '76px';

    const text = document.createTextNode(arr[2]);

    p.appendChild(text);
    tableRoot.appendChild(p);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.fontSize = '30px';
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
  tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
};

export const tooltipLine = {
  id: 'tooltipLine',
  beforeDraw: (chart) => {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const { ctx } = chart;
      ctx.save();
      const activePoint = chart.tooltip._active[0];

      ctx.beginPath();
      ctx.moveTo(activePoint.element.x, chart.chartArea.top);
      ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = '#696A6B';
      ctx.stroke();
      ctx.restore();
    }
  },
};
