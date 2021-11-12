import { createTheme } from '@mui/material';

export const theme = createTheme({
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
