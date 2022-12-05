import { AppFlowActions } from '../../constants';

/**
 * @param {*} data
 */
export default function reloadPageRequest() {
  return { type: AppFlowActions.RELOAD_PAGE_REQUEST };
}
