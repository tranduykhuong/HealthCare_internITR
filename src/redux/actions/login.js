import { AppFlowActions } from '../../constants';

/**
 *
 * @param {*} data
 */
export function loginRequest(data) {
  return { type: AppFlowActions.LOGIN_REQUEST, data };
}

/**
 *
 * @param {*} data
 */
export function logoutRequest(data) {
  return { type: AppFlowActions.LOGOUT_REQUEST, data };
}
