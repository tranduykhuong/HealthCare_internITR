import { fork } from 'redux-saga/effects';
import loginFlow from './login';
import updateProfileFlow from './updateProfile';
import overviewDataFlow from './overviewData';

export default function* root() {
  yield fork(loginFlow);
  yield fork(updateProfileFlow);
  yield fork(overviewDataFlow);
}
