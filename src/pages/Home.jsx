import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Paper,
  useTheme
} from '@mui/material';
import { 
  MusicNote as MusicIcon,
  Mood as MoodIcon,
  FeaturedPlayList as PlaylistIcon,
  YouTube as YouTubeIcon,
  TrendingUp as TrendingIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';
import { moodCategories } from '../utils/moodCategories';

// Sample mood categories for display
const moodKeys = Object.keys(moodCategories);
const sampleMoods = moodKeys.slice(0, 3);

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Mood-Based Music',
      description: 'Discover music that perfectly matches your current mood, from happy and energetic to calm and focused.',
      icon: <MoodIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      color: theme.palette.mode === 'dark' ? '#2c387e' : '#e3f2fd'
    },
    {
      title: 'YouTube Integration',
      description: 'Seamlessly play music from YouTube\'s vast library without needing a separate subscription service.',
      icon: <YouTubeIcon fontSize="large" sx={{ color: '#ff0000' }} />,
      color: theme.palette.mode === 'dark' ? '#330000' : '#ffebee'
    },
    {
      title: 'Smart Playlists',
      description: 'Let the app create the perfect playlist based on your mood selection, no manual searching required.',
      icon: <PlaylistIcon fontSize="large" sx={{ color: theme.palette.secondary.main }} />,
      color: theme.palette.mode === 'dark' ? '#7b1fa2' : '#f3e5f5'
    },
    {
      title: 'Mood Psychology',
      description: 'Understand how music affects your emotions with insights on the psychology of music and mood.',
      icon: <PsychologyIcon fontSize="large" sx={{ color: '#00796b' }} />,
      color: theme.palette.mode === 'dark' ? '#004d40' : '#e0f2f1'
    },
    {
      title: 'Trend Discovery',
      description: 'Explore trending music across different moods and discover new artists that match your preferences.',
      icon: <TrendingIcon fontSize="large" sx={{ color: '#f57c00' }} />,
      color: theme.palette.mode === 'dark' ? '#e65100' : '#fff3e0'
    },
    {
      title: 'Music Variety',
      description: 'Access a wide range of genres and styles, all organized by mood rather than traditional categories.',
      icon: <MusicIcon fontSize="large" sx={{ color: '#7cb342' }} />,
      color: theme.palette.mode === 'dark' ? '#33691e' : '#f1f8e9'
    }
  ];

  return (
    <Box component="main">
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          position: 'relative',
          backgroundColor: 'transparent',
          color: 'text.primary',
          mb: 4,
          mt: { xs: 3, md: 6 },
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0,0,0,0.6)' 
              : 'rgba(255,255,255,0.7)',
            zIndex: 1
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 6, md: 10 }
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.75rem' },
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)' 
                  : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              YouTube Mood Mixer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{ maxWidth: '800px', mb: 4 }}
            >
              Discover music that matches exactly how you feel. Our mood-based YouTube player
              creates the perfect soundtrack for every emotion, no subscription required.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mt: 2
              }}
            >
              <Button 
                variant="contained" 
                size="large"
                color="primary"
                onClick={() => navigate('/mood-player')}
                startIcon={<MoodIcon />}
                sx={{ px: 4, py: 1.5, borderRadius: 8 }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                color="secondary"
                onClick={() => {
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{ px: 4, py: 1.5, borderRadius: 8 }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Mood Categories Preview */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Find Music For Any Mood
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {sampleMoods.map((moodKey) => {
            const mood = moodCategories[moodKey];
            return (
              <Grid item key={moodKey} xs={12} sm={6} md={4}>
                <Card 
                  elevation={3}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    },
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `2px solid ${mood.color}`,
                  }}
                >
                  <Box 
                    sx={{ 
                      height: 140, 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: mood.color + '33', // Add transparency
                      color: mood.color
                    }}
                  >
                    <Typography variant="h1" component="div" sx={{ fontSize: '5rem' }}>
                      {mood.emoji}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {mood.name}
                    </Typography>
                    <Typography>
                      {mood.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => {
                        navigate('/mood-player');
                      }}
                    >
                      Listen Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box 
        id="features"
        sx={{ 
          py: 8, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 4,
          mt: 4,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Key Features
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    },
                    bgcolor: feature.color,
                    borderRadius: 3
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography gutterBottom variant="h5" component="h3" align="center">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Ready to discover music for your mood?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          No sign-up required. Just select your mood and start listening to perfectly matched music immediately.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/mood-player')}
          startIcon={<MusicIcon />}
          sx={{ px: 4, py: 1.5, borderRadius: 8 }}
        >
          Start Listening Now
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
