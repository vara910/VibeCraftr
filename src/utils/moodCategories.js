/**
 * Mood categories with associated music keywords for YouTube search
 * Each mood contains:
 * - name: Display name
 * - emoji: Visual representation
 * - description: Brief explanation
 * - keywords: Search terms for YouTube API
 * - color: Theme color for UI
 */

export const moodCategories = {
  happy: {
    name: 'Happy',
    emoji: '😊',
    description: 'Upbeat and positive vibes',
    keywords: ['happy music', 'upbeat songs', 'feel good music', 'positive vibes'],
    color: '#FFD700' // Gold
  },
  sad: {
    name: 'Sad',
    emoji: '😢',
    description: 'Melancholic and emotional',
    keywords: ['sad songs', 'emotional music', 'melancholy tunes', 'heartbreak songs'],
    color: '#4682B4' // Steel Blue
  },
  energetic: {
    name: 'Energetic',
    emoji: '⚡',
    description: 'High energy and motivation',
    keywords: ['workout music', 'energetic songs', 'motivational music', 'pump up songs'],
    color: '#FF4500' // Orange Red
  },
  calm: {
    name: 'Calm',
    emoji: '😌',
    description: 'Relaxing and peaceful',
    keywords: ['calming music', 'peaceful songs', 'relaxing tunes', 'meditation music'],
    color: '#7FB3D5' // Light Blue
  },
  focused: {
    name: 'Focused',
    emoji: '🧠',
    description: 'Concentration and productivity',
    keywords: ['study music', 'focus music', 'concentration music', 'productivity songs'],
    color: '#3498DB' // Darker Blue
  },
  romantic: {
    name: 'Romantic',
    emoji: '❤️',
    description: 'Love and affection',
    keywords: ['love songs', 'romantic music', 'love ballads', 'romantic playlist'],
    color: '#E74C3C' // Red
  }
};

/**
 * Get music keywords for a specific mood
 * @param {string} moodKey - The mood key from moodCategories
 * @returns {string[]} Array of keywords for the selected mood
 */
export const getMoodKeywords = (moodKey) => {
  return moodCategories[moodKey]?.keywords || [];
};

/**
 * Get a random keyword from a mood's keyword list
 * @param {string} moodKey - The mood key from moodCategories
 * @returns {string} A random keyword for search
 */
export const getRandomMoodKeyword = (moodKey) => {
  const keywords = getMoodKeywords(moodKey);
  if (keywords.length === 0) return '';
  
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
};

