'use client';
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  breakpoints: {
    values: {
      xs:286,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#FF560B",
      contrastText: "white",
      light:"#e0e0e0"
    },
    secondary: {
      main: "#FC3D21",
      contrastText: "white",
      light:"#eeeeee"
    },
  },
  typography: {
    fontFamily: [
      'Helvetica',
      'normal',
    ].join(','),
  }
});


export default theme;