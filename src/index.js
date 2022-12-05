import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-session';

import App from './app';
import configureStore from './redux/store';

const store = configureStore();
sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
