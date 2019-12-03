import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import './index.css';
import App from './ui/App';
import { lightTheme } from './theme';

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
