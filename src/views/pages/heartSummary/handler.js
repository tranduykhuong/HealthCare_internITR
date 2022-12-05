import { useRecoilValue } from 'recoil';
import moment from 'moment';
import {
  currentTimeRecoil, dataHrRecoil, typeRateRecoil, typeTimeRecoil,
} from './recoil';
import { generateDataChart } from '../../components/chartCT/handler';
import { HR_SUMMARY_CONSTANTS } from '../../../constants';

export const formatTime = () => {
  const type = useRecoilValue(typeTimeRecoil);
  const current = useRecoilValue(currentTimeRecoil);

  switch (type) {
    case 'Hour':
      return `${moment(current).subtract(1, 'h').startOf('hour').format('MMMM DD, h A')} - ${moment(current).endOf('hour').format('h A')}`;
    case 'Day':
      return moment(current).format('dddd, MMMM DD');
    case 'Week':
      if (moment(current).startOf('week').month() !== moment(current).endOf('week').month()) {
        return `${moment(current).startOf('week').format('MMMM DD')} - ${moment(current).endOf('week').format('MMMM DD')}`;
      }
      return `${moment(current).startOf('week').format('MMMM DD')} - ${moment(current).endOf('week').format('DD')}`;
    case 'Month':
      return moment(current).format('MMMM');
    case 'Year':
      return moment(current).format('YYYY');
    default:
      return current;
  }
};

export const handleConfigChart = () => {
  const type = useRecoilValue(typeTimeRecoil);
  const typeRate = useRecoilValue(typeRateRecoil);
  const data = useRecoilValue(dataHrRecoil);

  const {
    dataAvgs, dataMins, dataMaxs, yMin, yMax,
  } = generateDataChart(data, type);

  const datasets = {
    dataAvgs, dataMins, dataMaxs,
  };
  const point = {
    pointBorderWidth: '0',
    pointBackgroundColor: '#fff',
    lastPoint: false,
  };
  const xAxis = {
    xMin: data?.fromTime,
    xMax: data?.endTime,
    type: 'time',
    time: {},
  };
  const yAxis = {
    yMin, yMax,
  };
  let tension = '0';

  switch (type) {
    case 'Day':
      xAxis.time.unit = 'hour';
      xAxis.time.stepSize = '4';
      xAxis.time.displayFormats = {
        hour: 'h a',
      };
      break;
    case 'Week':
      xAxis.time.unit = 'day';
      xAxis.time.stepSize = '1';
      xAxis.time.displayFormats = {
        quater: 'Q',
      };
      break;
    case 'Month':
      xAxis.time.unit = 'day';
      xAxis.time.stepSize = '5';
      xAxis.time.displayFormats = {
        day: 'd',
      };
      break;
    case 'Year':
      xAxis.time.unit = 'month';
      xAxis.time.stepSize = '1';
      xAxis.time.displayFormats = {
        month: 'MMM',
      };
      break;
    default:
      break;
  }

  if (typeRate === HR_SUMMARY_CONSTANTS.ALL) {
    tension = '0.4';
    point.pointBorderWidth = '0';
    point.pointBackgroundColor = 'rgba(220,220,220,0)';
    point.lastPoint = true;
  } else {
    tension = '0';
    point.pointBorderWidth = '1';
    point.pointBackgroundColor = '#fff';
    datasets.dataMins = [];
    datasets.dataMaxs = [];
  }

  return {
    datasets,
    tension,
    point,
    xAxis,
    yAxis,
  };
};

export const calcAvgMinMax = () => {
  const data = useRecoilValue(dataHrRecoil);

  if (!data || data?.avgs.length === 0) {
    return {
      minValue: '-',
      maxValue: '-',
      avgValue: '-',
    };
  }

  let sumAvg = 0;
  let minValue = 500;
  let maxValue = 0;
  for (let i = 0; i < data?.avgs.length; i += 1) {
    sumAvg += data?.avgs[i].value;
    minValue = Math.min(minValue, data?.mins[i].value);
    maxValue = Math.max(maxValue, data?.maxs[i].value);
  }

  return {
    minValue,
    maxValue,
    avgValue: Math.round(sumAvg / data?.avgs.length),
  };
};

export const ABOUT = {
  [HR_SUMMARY_CONSTANTS.ALL]: {
    title: ' About Heart rate',
    content: 'Your heart rate, or pulse, is the number of times your heart beats per minute. Normal heart rate varies from person to person. As you age, changes in the rate and regularity of your pulse can change and may signify a heart condition or other condition that needs to be addressed',
  },
  [HR_SUMMARY_CONSTANTS.LYING]: {
    title: 'About Heart Rate Variability',
    content: 'Heart rate variability is a measure of how much the time between two heartbeats varies from beat to beat. It’s controlled by your autonomic nervous system (ANS), which is responsible for breathing, digestion, and other unconscious bodily functions.',
  },
  [HR_SUMMARY_CONSTANTS.RESTING]: {
    title: 'About Resting Heart Rate',
    content: 'Resting heart rate is the average heart beats per minute measured when you have been inactive or relaxed for several minutes. A lower resting heart rate my indicate better heart health. A normal resting heart rate for most people is between 60 and 100 beats per minute.',
  },

  [HR_SUMMARY_CONSTANTS.WALKING]: {
    title: 'About during Activity Heart Rate',
    content: 'Resting heart rate is the average heart beats per minute measured when you have been inactive or relaxed for several minutes. A lower resting heart rate my indicate better heart health. A normal resting heart rate for most people is between 60 and 100 beats per minute.',
  },
  [HR_SUMMARY_CONSTANTS.STANDING]: {
    title: 'About Standing Heart Rate',
    content: 'Resting heart rate is the average heart beats per minute measured when you have been inactive or relaxed for several minutes. A lower resting heart rate my indicate better heart health. A normal resting heart rate for most people is between 60 and 100 beats per minute.',
  },
};
