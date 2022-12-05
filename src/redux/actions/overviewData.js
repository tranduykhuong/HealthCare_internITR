import { FLOW_CONSTANTS } from '../../constants';

export default function overviewData(filter) {
  return { type: FLOW_CONSTANTS.OVERVIEW_DATA_REQUEST, filter };
}
