import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  IconButton,
  Skeleton,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import {
  MusicNote as MusicIcon,
  Repeat as RepeatIcon,
  AccessTime as TimeIcon,
  Favorite as FavoriteIcon,
  PlayArrow as PlayIcon,
  BarChart as StatIcon,
  CalendarMonth as CalendarIcon,
  MusicVideo as GenreIcon
} from '@mui/icons-material';
import { PieChart, LineChart } from '@mui/x-charts';
import { moodCategories } from '../utils/moodCategories';

// Mock data generator functions
const generateMockData = () => {
  // Activity data
  const activities = [];
  const today = new Date();
  const songTitles = [
    "Sunflower", "Blinding Lights", "Stay", "Heat Waves", "Bad Habits",
    "Levitating", "drivers license", "good 4 u", "Save Your Tears", "Watermelon Sugar"
  ];
  const artists = [
    "Post Malone", "The Weeknd", "Kid Laroi", "Glass Animals", "Ed Sheeran",
    "Dua Lipa", "Olivia Rodrigo", "Olivia Rodrigo", "The Weeknd", "Harry Styles"
  ];
  
  for (let i = 0; i < 10; i++) {
    const randomMoodKey = Object.keys(moodCategories)[Math.floor(Math.random() * Object.keys(moodCategories).length)];
    const mood = moodCategories[randomMoodKey];
    
    const randomSongIndex = Math.floor(Math.random() * songTitles.length);
    
    activities.push({
      id: i,
      songTitle: songTitles[randomSongIndex],
      artist: artists[randomSongIndex],
      timestamp: new Date(today.getTime() - (i * 3600000 * Math.floor(Math.random() * 24))),
      mood: {
        key: randomMoodKey,
        name: mood.name,
        emoji: mood.emoji,
        color: mood.color
      }
    });
  }
  
  // Mood distribution data
  const moodDistribution = Object.keys(moodCategories).map(key => {
    const randomCount = Math.floor(Math.random() * 30) + 5;
    return {
      id: key,
      value: randomCount,
      label: moodCategories[key].name,
      color: moodCategories[key].color
    };
  });
  
  // Listening history data (last 7 days)
  const listeningHistory = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short' });
    listeningHistory.push({
      date: formattedDate,
      count: Math.floor(Math.random() * 15) + 5,
    });
  }
  
  return {
    activities,
    moodDistribution,
    listeningHistory,
    stats: {
      totalListens: Math.floor(Math.random() * 200) + 50,
      favoriteMood: moodCategories[Object.keys(moodCategories)[Math.floor(Math.random() * Object.keys(moodCategories).length)]],
      minutesListened: Math.floor(Math.random() * 1500) + 300,
      lastActive: new Date(today.getTime() - Math.floor(Math.random() * 86400000))
    }
  };
};

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock data
        const mockData = generateMockData();
        setData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Prepare data for charts
  const preparePieChartData = () => {
    if (!data?.moodDistribution) return { data: [], colors: [] };
    
    return {
      data: data.moodDistribution.map(item => ({ value: item.value, label: item.label })),
      colors: data.moodDistribution.map(item => item.color)
    };
  };
  
  const pieChartData = preparePieChartData();
  
  // Format listening history data
  const formatLineChartData = () => {
    if (!data?.listeningHistory) return { xAxis: [], series: [] };
    
    return {
      xAxis: [{ 
        data: data.listeningHistory.map(item => item.date),
        scaleType: 'band'
      }],
      series: [{
        data: data.listeningHistory.map(item => item.count),
        area: true,
        color: theme.palette.primary.main
      }]
    };
  };
  
  const lineChartData = formatLineChartData();
  
  // Render loading skeletons
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Stat cards skeletons */}
          {[1, 2, 3, 4].map(item => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </Paper>
            </Grid>
          ))}
          
          {/* Charts skeletons */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Paper>
          </Grid>
          
          {/* Activity list skeleton */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
              {[1, 2, 3, 4, 5].map(item => (
                <Box key={item} sx={{ py: 1.5 }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ display: 'inline-block', mr: 2, verticalAlign: 'middle' }} />
                  <Box sx={{ display: 'inline-block', width: 'calc(100% - 60px)', verticalAlign: 'middle' }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '0.875rem', width: '60%' }} />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }
  
  // Render dashboard content
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom 
        sx={{ 
          mb: 4,
          fontWeight: 'bold',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)' 
            : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Your Listening Dashboard
      </Typography>
      
      {/* Stats cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                  <MusicIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Total Listens
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {data?.stats.totalListens}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Songs played through mood mixer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: data?.stats.favoriteMood.color, mr: 2 }}>
                  {data?.stats.favoriteMood.emoji}
                </Avatar>
                <Typography variant="h6" component="div">
                  Favorite Mood
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {data?.stats.favoriteMood.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your most selected mood category
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                  <TimeIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Minutes
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {data?.stats.minutesListened}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total minutes of music played
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3} 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#f57c00', mr: 2 }}>
                  <CalendarIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Last Active
                </Typography>
              </Box>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {data?.stats.lastActive.toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.stats.lastActive.toLocaleTimeString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 3,
              minHeight: 350
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Mood Distribution
            </Typography>
            
            <Box sx={{ height: 300 }}>
              <PieChart
                series={[
                  {
                    data: pieChartData.data,
                    innerRadius: 60,
                    outerRadius: 120,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    startAngle: -90,
                    endAngle: 270,
                    cx: 150,
                    cy: 150,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    arcLabel: (item) => `${item.label}`,
                    arcLabelMinAngle: 45,
                    valueFormatter: (value) => `${value} songs`,
                  },
                ]}
                colors={pieChartData.colors}
                height={300}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                legend={{ hidden: true }}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 3,
              minHeight: 350 
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Listening Activity (Last 7 Days)
            </Typography>
            
            <Box sx={{ height: 300 }}>
              <LineChart
                xAxis={lineChartData.xAxis}
                series={lineChartData.series}
                height={300}
                margin={{ top: 20, bottom: 30, left: 40, right: 20 }}
                sx={{
                  '.MuiLineElement-root': {
                    strokeWidth: 3,
                  },
                  '.MuiMarkElement-root': {
                    stroke: 'none',
                    scale: '0.6',
                    fill: theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              borderRadius: 3
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Recent Activity
            </Typography>
            
            <List sx={{ width: '100%' }}>
              {data?.activities.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton edge="end" aria-label="play" onClick={() => navigate('/mood-player')}>
                        <PlayIcon />
                      </IconButton>
                    }
                    sx={{ py: 1.5 }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: activity.mood.color }}>
                        {activity.mood.emoji}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" component="span" fontWeight="medium">
                          {activity.songTitle}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {activity.artist}
                          </Typography>
                          {" — "}
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {activity.timestamp.toLocaleString()} • {activity.mood.name} mood
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < data.activities.length - 1 && <Divider variant="inset" component="li" />}
                </Box>
              ))}
            </List>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => navigate('/mood-player')}
                startIcon={<MusicIcon />}
                sx={{ borderRadius: 8 }}
              >
                Start New Session
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
