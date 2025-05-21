import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Add,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionListItem = motion(ListItem);

const TrackList = ({ tracks }) => {
  const [playing, setPlaying] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handlePlayPause = (trackId) => {
    setPlaying(playing === trackId ? null : trackId);
    // TODO: Implement actual playback functionality
  };

  const handleToggleFavorite = (trackId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(trackId)) {
      newFavorites.delete(trackId);
    } else {
      newFavorites.add(trackId);
    }
    setFavorites(newFavorites);
  };

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <List sx={{ p: 0 }}>
        {tracks.map((track, index) => (
          <MotionListItem
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            divider
            sx={{
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={track.imageUrl}
                alt={track.name}
                sx={{ width: 48, height: 48 }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {track.name}
                </Typography>
              }
              secondary={
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="body2">
                    {track.artist}
                  </Typography>
                  •
                  <Typography variant="body2">
                    {track.album}
                  </Typography>
                </Box>
              }
            />

            <ListItemSecondaryAction
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mr: 2 }}
              >
                {track.duration}
              </Typography>

              <IconButton
                size="small"
                onClick={() => handleToggleFavorite(track.id)}
                sx={{
                  color: favorites.has(track.id) ? "#1DB954" : "text.secondary",
                  "&:hover": { color: "#1DB954" },
                }}
              >
                {favorites.has(track.id) ? <Favorite /> : <FavoriteBorder />}
              </IconButton>

              <IconButton
                size="small"
                onClick={() => handlePlayPause(track.id)}
                sx={{
                  color: playing === track.id ? "#1DB954" : "text.secondary",
                  "&:hover": { color: "#1DB954" },
                }}
              >
                {playing === track.id ? <Pause /> : <PlayArrow />}
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "#1DB954" },
                }}
              >
                <Add />
              </IconButton>
            </ListItemSecondaryAction>
          </MotionListItem>
        ))}
      </List>
    </Card>
  );
};

export default TrackList;
