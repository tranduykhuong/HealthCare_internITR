import * as _ from 'lodash';
import moment from 'moment';
import {
  put, call, takeEvery,
} from 'redux-saga/effects';
import { FLOW_CONSTANTS } from '../../constants';
import fetchHeartRateAverage from '../../services/apollo/functions/fetchHeartRateAverage';
import fetchHeartRates from '../../services/apollo/functions/fetchHeartRates';
import fetchNearestTimeHasActivity from '../../services/apollo/functions/fetchNearestTimeHasActivity';

export function* overviewData(request) {
  let { filter } = request;

  try {
    const heartRates = yield call(fetchHeartRates, { ...filter });

    filter = {
      start: heartRates?.fromTime,
      stop: heartRates?.endTime,
      utcOffset: 420,
    };

    const heartRateAvg = yield call(fetchHeartRateAverage, { ...filter });
    const nearestTime = yield call(fetchNearestTimeHasActivity, { utcOffset: 420 });
    filter = {
      start: moment(nearestTime?.time).startOf('day').valueOf(),
      stop: moment(nearestTime?.time).endOf('day').valueOf(),
      utcOffset: 420,
    };

    const activity = yield call(fetchHeartRateAverage, { ...filter });

    const overviewData = {
      finished: true,
      heartRates,
      activity: {
        fromTime: moment(nearestTime?.time).startOf('day').valueOf(),
        endTime: moment(nearestTime?.time).endOf('day').valueOf(),
        activity: _.map(activity?.ceiledActiveMinutes, e => ({ ...e, duration: e.duration / 60 })),
      },
      AVG: {
        resting: Math.round(heartRateAvg?.resting),
        standing: Math.round(heartRateAvg?.standing),
        hrv: Math.round(heartRateAvg?.hrv),
        activityHR: Math.round(activity?.activity),
        activityMinutes: _.reduce(activity?.ceiledActiveMinutes, (acc, cur) => acc + cur?.duration, 0) / 60,
      },
    };

    yield put({ type: FLOW_CONSTANTS.OVERVIEW_DATA_COMLETE, data: overviewData });
  } catch (error) {
    const overviewDataError = {
      finished: true,
      heartRates: {},
      activity: {
        fromTime: 0,
        endTime: 0,
        activity: '-',
      },
      AVG: {
        resting: '-',
        standing: '-',
        hrv: '-',
        activityHR: '-',
        activityMinutes: '-',
      },
      error: error.message,
    };
    yield put({ type: FLOW_CONSTANTS.OVERVIEW_DATA_ERROR, data: overviewDataError });
  }
}

export default function* overviewDataFlow() {
  yield takeEvery(FLOW_CONSTANTS.OVERVIEW_DATA_REQUEST, overviewData);
}
