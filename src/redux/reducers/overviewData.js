import { FLOW_CONSTANTS } from '../../constants';
import initialState from './initialState';

const overviewData = (state = initialState.overviewData, action) => {
  switch (action.type) {
    case FLOW_CONSTANTS.OVERVIEW_DATA_COMLETE:
      return action.data;
    case FLOW_CONSTANTS.OVERVIEW_DATA_ERROR:
      return action.data;
    default:
      return state;
  }
};

export default overviewData;
