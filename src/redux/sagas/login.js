import {
  put, call, takeEvery,
} from 'redux-saga/effects';
import auth from '../../utils/auth';
import { AppFlowActions } from '../../constants';

import fetchMe from '../../services/apollo/functions/fetchMe';

export function* loginRequest() {
  try {
    const result = yield call(fetchMe);
    if (result) {
      auth.login(result);
      yield put({ type: AppFlowActions.LOGIN_COMPLETE, data: result });
    }
  } catch (error) {
    yield put({ type: AppFlowActions.LOGIN_ERROR, error: error.message });
  }
}

export default function* loginFlow() {
  yield takeEvery(AppFlowActions.LOGIN_REQUEST, loginRequest);
}
