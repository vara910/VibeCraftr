import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import './YouTubePlayer.css';

const YouTubePlayer = ({ videoId, autoplay = true, onEnd, onError }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    // Reset states when videoId changes
    setIsLoading(true);
    setError(null);
  }, [videoId]);

  const onReady = (event) => {
    setPlayer(event.target);
    setIsLoading(false);
    
    // Set initial volume
    event.target.setVolume(volume);
    
    if (autoplay) {
      setIsPlaying(true);
      event.target.playVideo();
    }
  };

  const onPlayerError = (event) => {
    setIsLoading(false);
    setError(`Video playback error: ${event.data}`);
    if (onError) {
      onError(event.data);
    }
  };

  const onPlayerStateChange = (event) => {
    // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsLoading(false);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false);
      if (onEnd) onEnd();
    } else if (event.data === YouTube.PlayerState.BUFFERING) {
      setIsLoading(true);
    }
  };

  const togglePlayPause = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: autoplay ? 1 : 0,
      controls: 0, // Hide default controls
      modestbranding: 1,
      rel: 0, // Don't show related videos
    },
  };

  return (
    <div className="youtube-player-container">
      {!videoId && !error && (
        <div className="placeholder">
          <p>Select a mood to start playing music</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {videoId && !error && (
        <>
          <div className="player-wrapper">
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onError={onPlayerError}
              onStateChange={onPlayerStateChange}
              className="youtube-player"
            />
            {isLoading && (
              <div className="loading-overlay">
                <div className="loader"></div>
                <p>Loading...</p>
              </div>
            )}
          </div>
          
          <div className="controls">
            <button
              className={`control-btn ${isPlaying ? 'pause' : 'play'}`}
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="volume-control">
              <span>🔈</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange} 
                className="volume-slider"
                aria-label="Volume"
              />
              <span>🔊</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

YouTubePlayer.propTypes = {
  videoId: PropTypes.string,
  autoplay: PropTypes.bool,
  onEnd: PropTypes.func,
  onError: PropTypes.func,
};

export default YouTubePlayer;

