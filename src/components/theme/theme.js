import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component
    MuiPopover: {
      styleOverrides: {
        // Name of the slot
        paper: {
          // Some CSS
          top: '495px !important',
          backgroundColor: 'lightblue',
        },
      },
    },
  },
});

export default theme;
