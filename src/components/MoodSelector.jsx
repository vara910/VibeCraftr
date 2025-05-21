import {
  Box,
  Card,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import {
  SentimentSatisfiedAlt,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  Whatshot,
  NightsStay,
  LocalCafe,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const moods = [
  {
    name: "Happy",
    icon: <SentimentSatisfiedAlt sx={{ fontSize: 40 }} />,
    color: "#1DB954",
    description: "Upbeat and cheerful tracks"
  },
  {
    name: "Sad",
    icon: <SentimentDissatisfied sx={{ fontSize: 40 }} />,
    color: "#5C67DE",
    description: "Melancholic and emotional songs"
  },
  {
    name: "Angry",
    icon: <SentimentVeryDissatisfied sx={{ fontSize: 40 }} />,
    color: "#E35454",
    description: "Intense and powerful music"
  },
  {
    name: "Energetic",
    icon: <Whatshot sx={{ fontSize: 40 }} />,
    color: "#FF9B42",
    description: "High-energy dance tracks"
  },
  {
    name: "Relaxed",
    icon: <NightsStay sx={{ fontSize: 40 }} />,
    color: "#8C67AC",
    description: "Calm and soothing melodies"
  },
  {
    name: "Focused",
    icon: <LocalCafe sx={{ fontSize: 40 }} />,
    color: "#4D91D9",
    description: "Concentration-enhancing music"
  },
];

const MoodSelector = ({ onMoodSelect, selectedMood }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {moods.map((mood, index) => (
        <Grid item xs={12} sm={6} md={4} key={mood.name}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onMoodSelect(mood.name.toLowerCase())}
            sx={{
              p: 3,
              cursor: "pointer",
              background: selectedMood === mood.name.toLowerCase()
                ? `${mood.color}33`
                : "background.paper",
              border: selectedMood === mood.name.toLowerCase()
                ? `2px solid ${mood.color}`
                : "2px solid transparent",
              "&:hover": {
                transform: "translateY(-4px)",
                transition: "transform 0.2s ease-in-out",
                background: `${mood.color}1A`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  color: mood.color,
                  mb: 2,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {mood.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  color: selectedMood === mood.name.toLowerCase()
                    ? mood.color
                    : "text.primary",
                }}
              >
                {mood.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {mood.description}
              </Typography>
            </Box>
          </MotionCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoodSelector;
