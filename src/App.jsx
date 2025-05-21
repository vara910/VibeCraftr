import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  useMediaQuery,
  Container
} from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MoodPlayer from "./pages/MoodPlayer";
import "./App.css";

function App() {
  // Theme mode state (light/dark)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#e91e63',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f5f5',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
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
      }),
    [mode]
  );

  // Toggle theme mode
  const toggleThemeMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column"
      }}>
        <Navbar toggleThemeMode={toggleThemeMode} currentMode={mode} />
        <Container maxWidth="lg" sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          mt: 3, 
          mb: 5,
          px: { xs: 2, sm: 3 }
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mood-player" element={<MoodPlayer />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
