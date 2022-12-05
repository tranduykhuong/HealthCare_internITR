import initialState from './initialState';
import { AppFlowActions } from '../../constants';

function processReload(state = initialState, action) {
  console.log('processReload');
  if (action.type === AppFlowActions.RELOAD_PAGE_REQUEST) {
    const { login } = state;
    const returnValue = Object.assign({}, initialState);
    returnValue.login = login;
    return returnValue;
  }
  return state;
}

export default processReload;
