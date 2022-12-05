import { AppFlowActions } from '../../constants';
import auth from '../../utils/auth';
import initialState from './initialState';

const login = (state = auth.me() || initialState.login, action) => {
  switch (action.type) {
    case AppFlowActions.LOGIN_COMPLETE:
      return action.data;
    case AppFlowActions.LOGIN_ERROR:
      return { error: action.error };
    case AppFlowActions.UPDATE_PROFILE_COMPLETE:
      return action.data;
    case AppFlowActions.UPDATE_PROFILE_ERROR:
      return { error: action.error };
    case AppFlowActions.LOGOUT_COMPLETE:
      return action;
    default:
      return state;
  }
};

export default login;
