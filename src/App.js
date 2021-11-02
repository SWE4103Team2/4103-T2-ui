import React from 'react';
import Router from './components/router/Router.js';
import { BrowserRouter } from 'react-router-dom';
import { BrowserHistory } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#870000',
      light: '#870000',
      dark: '#870000',
    },
    secondary: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    },
    text: {
      secondary: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: '#ff1200',
    },
    background: {
      default: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 1150,
    },
  },
});

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
