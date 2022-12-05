/* eslint-disable no-return-assign */
import * as _ from 'lodash';

const initialTimeObject = {
  id: '',
  time: '',
  disable: '',
};

// The option to use to read timeline from the JSON file
export const fetchTimelineFromJson = (start, end) => [..._.slice(TimelineJSON.timeline, start * 2, end * 2)];

// The option to use to create timeline from start-time and end-time
export const createTimeline = (start, end, duration = 30) => {
  const timeline = [];
  let hour = start;
  let minus = 0;
  for (let i = 0; hour < end; i += 1) {
    const obj = Object.create(initialTimeObject);
    obj.time = `${hour.toString()}:${minus.toString()}${minus === 0 ? '0' : ''}`;
    obj.disable = false;
    obj.id = i;

    timeline.push(obj);

    minus = (minus + duration) % 60;
    if (minus === 0) hour += 1;
  }
  return timeline;
};

// Processing the timeline
// Time complexity: O(n)
export const dataProcessing = (timeline, dataTime) => {
  // Copy to a new list helps to decrease timeline creation when user only change duration
  const listTmp = _.map(timeline, (item) => {
    const newItem = {};
    Object.assign(newItem, item);
    return newItem;
  });

  const idxStartDis = dataTime.startDis < dataTime.start
    ? 0
    : (dataTime.startDis - dataTime.start) * 2;
  const idxEndDis = (dataTime.endDis - dataTime.start) * 2;

  let beforeRange = _.slice(listTmp, 0, idxStartDis);
  let disableRange = _.slice(listTmp, idxStartDis, idxEndDis);
  let afterRange = _.slice(listTmp, idxEndDis, listTmp.length);

  beforeRange = _.chunk(beforeRange, dataTime.duration);
  afterRange = _.chunk(afterRange, dataTime.duration);

  if (
    beforeRange.length
    && beforeRange[beforeRange.length - 1].length < dataTime.duration
  ) {
    _.forEach(
      beforeRange[beforeRange.length - 1],
      item => (item.disable = true),
    );
  }
  if (
    afterRange.length
    && afterRange[afterRange.length - 1].length < dataTime.duration
  ) {
    _.forEach(
      afterRange[afterRange.length - 1],
      item => (item.disable = true),
    );
  }

  _.forEach(disableRange, item => (item.disable = true));
  disableRange = _.chunk(disableRange, 1);
  return _.concat(beforeRange, disableRange, afterRange);
};

export const parstNextTime = (currentTime, duration) => {
  let hour; let
    minus;
  if (currentTime[1] === ':') {
    hour = currentTime[0];
    minus = currentTime.substr(2);
  } else {
    hour = currentTime.substr(0, 2);
    minus = currentTime.substr(3);
  }

  minus = (+minus + duration) % 60;
  if (minus === 0) hour = +hour + 1;
  return `${hour}:${minus}${minus === 0 ? '0' : ''}`;
};
