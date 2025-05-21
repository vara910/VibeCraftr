import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MusicNote as MusicIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const Navbar = ({ toggleThemeMode, currentMode }) => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  // Mock authentication - in a real app, use a proper auth context/hook
  const [isAuthenticated] = useState(false);

  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Mood Player', path: '/mood-player' },
    { title: 'Dashboard', path: '/dashboard', requiresAuth: true },
  ];
  
  const userMenuItems = isAuthenticated
    ? [{ title: 'Profile', path: '/profile' }, { title: 'Logout', path: '/logout' }]
    : [{ title: 'Login', path: '/login' }];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <MusicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOOD MIXER
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages
                .filter(page => !page.requiresAuth || isAuthenticated)
                .map((page) => (
                  <MenuItem 
                    key={page.title} 
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                    selected={location.pathname === page.path}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <MusicIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOOD MIXER
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages
              .filter(page => !page.requiresAuth || isAuthenticated)
              .map((page) => (
                <Button
                  key={page.title}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    my: 2, 
                    color: 'inherit',
                    display: 'block',
                    fontWeight: location.pathname === page.path ? 'bold' : 'normal',
                    borderBottom: location.pathname === page.path 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : 'none',
                  }}
                >
                  {page.title}
                </Button>
              ))}
          </Box>

          {/* Theme toggle */}
          <Box sx={{ mr: 2 }}>
            <Tooltip title={`Switch to ${currentMode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton onClick={toggleThemeMode} color="inherit">
                {currentMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {isAuthenticated ? (
                  <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                ) : (
                  <PersonIcon />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem 
                  key={item.title} 
                  onClick={handleCloseUserMenu}
                  component={RouterLink}
                  to={item.path}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  toggleThemeMode: PropTypes.func.isRequired,
  currentMode: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default Navbar;
