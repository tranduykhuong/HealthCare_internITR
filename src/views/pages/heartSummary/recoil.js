import { atom, selector } from 'recoil';
import moment from 'moment';
import { HR_SUMMARY_CONSTANTS } from '../../../constants';

export const typeTimeRecoil = atom({
  key: 'typeTimeRecoil',
  default: 'Hour',
});

export const typeRateRecoil = atom({
  key: 'typeRateRecoil',
  default: HR_SUMMARY_CONSTANTS.ALL,
});

export const currentTimeRecoil = atom({
  key: 'currentTimeRecoil',
  default: moment().valueOf(),
});

export const dataHrRecoil = atom({
  key: 'dataHrRecoil',
  default: undefined,
});

export const getTimeRecoil = selector({
  key: 'getTimeRecoil',

  get: ({ get }) => {
    const type = get(typeTimeRecoil);
    const current = get(currentTimeRecoil);

    let fromTime = moment(current).startOf(type).valueOf();
    let endTime = moment(current).endOf(type).valueOf();
    let interval;

    switch (type) {
      case 'Hour':
        interval = '1m';
        fromTime = moment(current).subtract(1, 'h').startOf(type).valueOf();
        endTime = moment(current).startOf(type).valueOf();
        break;
      case 'Day':
        interval = '30m';
        break;
      case 'Week':
        interval = '6h';
        break;
      case 'Month':
        interval = '';
        break;
      case 'Year':
        interval = '';
        break;
      default:
        return current;
    }

    return {
      fromTime, endTime, interval,
    };
  },
});
