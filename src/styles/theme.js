import { createTheme } from "@mui/material/styles";

// Theme factory to support both light and dark modes
export const createAppTheme = (mode = 'light') => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2', // Blue theme
      light: mode === 'dark' ? '#e3f2fd' : '#42a5f5',
      dark: mode === 'dark' ? '#64b5f6' : '#0d47a1',
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#e91e63', // Pink theme
      light: mode === 'dark' ? '#f8bbd0' : '#f06292',
      dark: mode === 'dark' ? '#c2185b' : '#ad1457',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
      secondary: mode === 'dark' ? '#b3b3b3' : '#757575',
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 20px",
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Create default theme (light mode)
const theme = createAppTheme('light');

export default theme;
