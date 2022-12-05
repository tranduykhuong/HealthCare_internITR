import { combineReducers } from 'redux';
import auth from '../../utils/auth';
import { AppFlowActions } from '../../constants';
import login from './login';
import overviewData from './overviewData';
import initialState from './initialState';

const appReducer = combineReducers({
  login, overviewData,
});

function rootReducer(state, action) {
  if (action.type === AppFlowActions.LOGOUT_REQUEST) {
    auth.logout();
    return initialState;
  }

  return appReducer(state, action);
}

export default rootReducer;
