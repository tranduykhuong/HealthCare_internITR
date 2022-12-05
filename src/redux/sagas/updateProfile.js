import {
  put, call, take, takeEvery,
} from 'redux-saga/effects';
import auth from '../../utils/auth';
import { AppFlowActions } from '../../constants';
import handleUpdateProfile from '../../services/apollo/functions/handleUpdateProfile';


export function* updateProfileRequest(request) {
  const { data } = request;

  try {
    const result = yield call(handleUpdateProfile, { ...data });
    if (result) {
      auth.login(result);
      yield put({ type: AppFlowActions.UPDATE_PROFILE_COMPLETE, data: result });
    }
  } catch (error) {
    yield put({ type: AppFlowActions.UPDATE_PROFILE_ERROR, error: error.message });
    throw new Error(error.message);
  }
}

export default function* updateProfileFlow() {
  yield takeEvery(AppFlowActions.UPDATE_PROFILE_REQUEST, updateProfileRequest);
}
