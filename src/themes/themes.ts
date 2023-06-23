'use client';
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
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