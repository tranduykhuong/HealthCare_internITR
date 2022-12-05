import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { loadState } from './localStorage';

const persistedState = loadState();
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      rootReducer,
      persistedState,
      applyMiddleware(sagaMiddleware),
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
