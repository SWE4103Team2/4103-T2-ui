import React from 'react';
import Router from './components/router/Router.js';
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
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
