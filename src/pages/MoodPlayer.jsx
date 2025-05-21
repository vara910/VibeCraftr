import { useState, useEffect } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import MoodSelector from '../components/MoodSelector/MoodSelector';
import YouTubePlayer from '../components/YouTubePlayer/YouTubePlayer';
import { getRandomMoodVideo } from '../services/youtube';
import { moodCategories } from '../utils/moodCategories';

const MoodPlayer = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Load a video when mood is selected
  useEffect(() => {
    if (!selectedMood) return;
    
    const loadVideo = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getRandomMoodVideo(selectedMood);
        
        if (!result.success) {
          setError(result.message);
          setLoading(false);
          return;
        }
        
        setCurrentVideo(result.video);
        setLoading(false);
      } catch (err) {
        console.error('Error loading video:', err);
        setError('Failed to load video. Please try again.');
        setLoading(false);
      }
    };
    
    loadVideo();
  }, [selectedMood]);

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    
    // Reset playlist when mood changes
    setPlaylistVideos([]);
    setCurrentVideoIndex(0);
  };

  // Handle video end - play next song with same mood
  const handleVideoEnd = async () => {
    try {
      const result = await getRandomMoodVideo(selectedMood);
      
      if (!result.success) {
        setError(result.message);
        return;
      }
      
      setCurrentVideo(result.video);
      
      // Add to playlist history
      setPlaylistVideos(prev => [...prev, result.video]);
      setCurrentVideoIndex(prev => prev + 1);
    } catch (err) {
      console.error('Error loading next video:', err);
      setError('Failed to load next video. Please try again.');
    }
  };

  // Handle errors in the YouTube player
  const handleVideoError = (errorCode) => {
    console.error('YouTube player error:', errorCode);
    setError(`YouTube playback error (${errorCode}). Trying next video...`);
    
    // Try to load another video
    handleVideoEnd();
  };

  return (
    <Box className="mood-player-container">
      <Typography variant="h4" component="h1" gutterBottom 
        sx={{ 
          textAlign: 'center', 
          marginBottom: 4,
          color: selectedMood ? moodCategories[selectedMood]?.color : 'inherit'
        }}
      >
        YouTube Mood Mixer
      </Typography>
      
      <MoodSelector onMoodSelect={handleMoodSelect} />
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ margin: '20px 0' }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      <Box sx={{ marginTop: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <YouTubePlayer 
            videoId={currentVideo?.id}
            onEnd={handleVideoEnd}
            onError={handleVideoError}
          />
        )}
      </Box>

      {currentVideo && (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="h6">{currentVideo.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {currentVideo.channelTitle}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MoodPlayer;

