import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { history } from './AppHistory';
import AppView from './AppView';
import store from '../../store';

const AppContainer: React.FunctionComponent = () => (
  <Provider store={store}>
    <Router history={history!}>
      <AppView />
    </Router>
  </Provider>
);

export default AppContainer;
