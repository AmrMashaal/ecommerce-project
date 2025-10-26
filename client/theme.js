// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#073030", // Dark teal
      light: "#275b55ff", // Light teal
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#fb9a24ff", // Accent yellow
      contrastText: "#073030",
    },
    background: {
      default: "#FFFFFF", // Page background
      paper: "#F5F5F5", // Card/section background
      dark: "#E0E0E0", // Slightly darker background for contrast
    },
    text: {
      primary: "#042425", // Darker teal for text
      secondary: "#555555", // Gray text
    },
  },
  typography: {
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
