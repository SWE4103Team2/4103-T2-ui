import React from 'react';
import Router from './components/router/Router.js';
import { BrowserRouter } from 'react-router-dom';
import { BrowserHistory } from 'react-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter history={BrowserHistory}>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
