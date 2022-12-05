import { AppFlowActions } from '../../constants';

/**
 *
 * @param {*} data
 */
export default function updateProfileRequest(data) {
  return { type: AppFlowActions.UPDATE_PROFILE_REQUEST, data };
}
