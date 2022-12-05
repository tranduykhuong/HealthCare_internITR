export const AppFlowActions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_COMPLETE: 'LOGIN_COMPLETE',
  LOGIN_ERROR: 'LOGIN_ERROR',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_COMPLETE: 'UPDATE_PROFILE_COMPLETE',
  UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',

  GET_ALL_DATA_REQUEST: 'GET_ALL_DATA_REQUEST',
  GET_ALL_DATA_COMPLETE: 'GET_ALL_DATA_COMPLETE',

  RELOAD_PAGE_REQUEST: 'RELOAD_PAGE_REQUEST',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_COMPLETE: 'LOGOUT_COMPLETE',

};

export const FLOW_CONSTANTS = {
  QUERY_HEART_RATES_REQUEST: 'QUERY_HEART_RATES_REQUEST',
  QUERY_HEART_RATES_COMPLETE: 'QUERY_HEART_RATES_COMPLETE',
  QUERY_HEART_RATES_ERROR: 'QUERY_HEART_RATES_ERROR',

  QUERY_HEART_RATES_AVG_REQUEST: 'QUERY_HEART_RATES_AVG_REQUEST',
  QUERY_HEART_RATES_AVG_COMPLETE: 'QUERY_HEART_RATES_AVG_COMPLETE',
  QUERY_HEART_RATES_AVG_ERROR: 'QUERY_HEART_RATES_AVG_ERROR',

  OVERVIEW_DATA_REQUEST: 'OVERVIEW_DATA_REQUEST',
  OVERVIEW_DATA_COMLETE: 'OVERVIEW_DATA_COMPLETE',
  OVERVIEW_DATA_ERROR: 'OVERVIEW_DATA_ERROR',
};

export const EMITTER_CONSTANTS = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
};

export const HR_SUMMARY_CONSTANTS = {
  ALL: 'All',
  STANDING: 'Standing',
  RESTING: 'Resting',
  LYING: 'Lying',
  WALKING: 'Walking',
};