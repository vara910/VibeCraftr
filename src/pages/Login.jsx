import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  useTheme,
  Divider
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  MusicNote as MusicIcon
} from '@mui/icons-material';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form validation
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error when typing
    if (error) {
      setError(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Mock authentication delay
    setTimeout(() => {
      // For demo: Accept any valid email format and password >= 6 characters
      if (formData.email === 'demo@example.com' && formData.password === 'password123') {
        // Successful login
        // In a real app, you'd set authentication state here
        navigate('/mood-player');
      } else {
        // Failed login
        setError('Invalid email or password. Try using demo@example.com and password123');
      }
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: theme.palette.background.paper
        }}
      >
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: theme.palette.primary.main,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <MusicIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            Welcome Back
          </Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            size="large"
            sx={{ 
              py: 1.5,
              mb: 2, 
              position: 'relative',
              borderRadius: 8
            }}
          >
            {loading ? (
              <CircularProgress 
                size={24} 
                color="inherit" 
                sx={{ position: 'absolute' }} 
              />
            ) : 'Sign In'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" variant="body2">
                Sign Up
              </Link>
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/mood-player')}
              sx={{ borderRadius: 8, px: 3 }}
            >
              Continue as Guest
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              For demo use: email: demo@example.com, password: password123
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
