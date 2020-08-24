import React from 'react';
import ReactDOM from 'react-dom';

import './styles/base.scss';

import AppContainer from './components/app/AppContainer';

const App = AppContainer;

ReactDOM.render(<App />, document.getElementById('app'));
