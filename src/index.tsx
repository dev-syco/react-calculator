import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { App } from './components/App';

ReactDOM.render(<App/>, document.getElementById('root'));
