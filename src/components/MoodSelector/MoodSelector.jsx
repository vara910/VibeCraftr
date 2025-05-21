import { useState } from 'react';
import PropTypes from 'prop-types';
import { moodCategories } from '../../utils/moodCategories';
import './MoodSelector.css';

const MoodSelector = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      <div className="mood-grid">
        {Object.entries(moodCategories).map(([key, mood]) => (
          <div
            key={key}
            className={`mood-card ${selectedMood === key ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(key)}
          >
            <div className="mood-icon">{mood.emoji}</div>
            <h3>{mood.name}</h3>
            <p>{mood.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

MoodSelector.propTypes = {
  onMoodSelect: PropTypes.func.isRequired,
};

export default MoodSelector;

