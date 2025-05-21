import { getRandomMoodKeyword } from '../utils/moodCategories';

// Constants
const API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_URL || 'https://www.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Caching to reduce API calls
const cache = {
  searches: new Map(),
  videos: new Map(),
  expiry: 30 * 60 * 1000 // 30 minutes
};

/**
 * Validate API key exists
 * @returns {boolean} True if API key is valid
 */
const validateApiKey = () => {
  if (!API_KEY || API_KEY === '343842674094-f7ap1nedfph7tbpo7olt7dol104lgst2.apps.googleusercontent.com') {
    console.error('Invalid YouTube API key. Please add your API key to .env file.');
    return false;
  }
  return true;
};

/**
 * Check if the cache entry is still valid
 * @param {Object} entry - The cache entry
 * @returns {boolean} True if entry is valid
 */
const isCacheValid = (entry) => {
  if (!entry) return false;
  return Date.now() - entry.timestamp < cache.expiry;
};

/**
 * Handle API errors with appropriate messages
 * @param {Error} error - The error object
 * @returns {Object} Formatted error object
 */
const handleApiError = (error) => {
  let message = 'An error occurred while fetching data from YouTube';
  let code = 'UNKNOWN_ERROR';

  // Check for quota exceeded
  if (error.response) {
    const { status, data } = error.response;
    
    if (status === 403 && data.error && data.error.errors) {
      const quotaError = data.error.errors.find(e => e.reason === 'quotaExceeded');
      if (quotaError) {
        code = 'QUOTA_EXCEEDED';
        message = 'YouTube API quota exceeded. Please try again tomorrow.';
      }
    } else if (status === 400) {
      code = 'BAD_REQUEST';
      message = 'Invalid request parameters';
    } else if (status === 401) {
      code = 'UNAUTHORIZED';
      message = 'Invalid API key';
    } else if (status === 404) {
      code = 'NOT_FOUND';
      message = 'The requested resource was not found';
    } else if (status >= 500) {
      code = 'SERVER_ERROR';
      message = 'YouTube server error. Please try again later.';
    }
  } else if (error.request) {
    code = 'NETWORK_ERROR';
    message = 'Network error. Please check your internet connection.';
  }

  console.error(`YouTube API Error: ${code}`, error);
  return { success: false, code, message };
};

/**
 * Search for videos based on mood
 * @param {string} moodKey - The mood key from moodCategories
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Search results or error
 */
export const searchMoodVideos = async (moodKey, options = {}) => {
  if (!validateApiKey()) {
    return { 
      success: false, 
      code: 'INVALID_API_KEY', 
      message: 'Please add a valid YouTube API key in your .env file' 
    };
  }

  try {
    const {
      maxResults = 10,
      videoDuration = 'medium',
      videoCategory = '10', // Music category
      useCache = true
    } = options;

    // Generate a search query based on the mood
    const moodKeyword = getRandomMoodKeyword(moodKey);
    const searchQuery = `${moodKeyword} music`;
    
    // Check cache first
    const cacheKey = `${searchQuery}-${maxResults}-${videoDuration}`;
    if (useCache && cache.searches.has(cacheKey)) {
      const cachedResult = cache.searches.get(cacheKey);
      if (isCacheValid(cachedResult)) {
        return cachedResult.data;
      }
    }

    // Prepare the search URL
    const url = new URL(`${API_BASE_URL}/search`);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', searchQuery);
    url.searchParams.append('type', 'video');
    url.searchParams.append('maxResults', maxResults);
    url.searchParams.append('videoCategoryId', videoCategory);
    url.searchParams.append('videoDuration', videoDuration);
    url.searchParams.append('key', API_KEY);

    // Make the API request
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { status: response.status, data: errorData } };
    }

    const data = await response.json();
    
    // Format the response
    const formattedResults = {
      success: true,
      videos: data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt
      })),
      mood: moodKey,
      searchQuery: searchQuery
    };

    // Cache the result
    cache.searches.set(cacheKey, {
      timestamp: Date.now(),
      data: formattedResults
    });

    return formattedResults;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get details for a specific video
 * @param {string} videoId - YouTube video ID
 * @param {boolean} useCache - Whether to use cached data if available
 * @returns {Promise<Object>} Video details or error
 */
export const getVideoDetails = async (videoId, useCache = true) => {
  if (!validateApiKey()) {
    return { 
      success: false, 
      code: 'INVALID_API_KEY', 
      message: 'Please add a valid YouTube API key in your .env file' 
    };
  }

  if (!videoId) {
    return {
      success: false,
      code: 'MISSING_VIDEO_ID',
      message: 'Video ID is required'
    };
  }

  try {
    // Check cache first
    if (useCache && cache.videos.has(videoId)) {
      const cachedResult = cache.videos.get(videoId);
      if (isCacheValid(cachedResult)) {
        return cachedResult.data;
      }
    }

    // Prepare the URL for video details
    const url = new URL(`${API_BASE_URL}/videos`);
    url.searchParams.append('part', 'snippet,contentDetails,statistics');
    url.searchParams.append('id', videoId);
    url.searchParams.append('key', API_KEY);

    // Make the API request
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { status: response.status, data: errorData } };
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return {
        success: false,
        code: 'VIDEO_NOT_FOUND',
        message: 'The requested video was not found'
      };
    }

    const videoData = data.items[0];
    
    // Format the response
    const formattedResult = {
      success: true,
      video: {
        id: videoData.id,
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        thumbnail: videoData.snippet.thumbnails.high.url,
        channelTitle: videoData.snippet.channelTitle,
        publishedAt: videoData.snippet.publishedAt,
        duration: videoData.contentDetails.duration,
        viewCount: videoData.statistics.viewCount,
        likeCount: videoData.statistics.likeCount
      }
    };

    // Cache the result
    cache.videos.set(videoId, {
      timestamp: Date.now(),
      data: formattedResult
    });

    return formattedResult;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Clear all cached data
 */
export const clearCache = () => {
  cache.searches.clear();
  cache.videos.clear();
};

/**
 * Get a random music video for a specific mood
 * @param {string} moodKey - The mood key from moodCategories
 * @returns {Promise<Object>} Random video or error
 */
export const getRandomMoodVideo = async (moodKey) => {
  const result = await searchMoodVideos(moodKey, { maxResults: 15 });
  
  if (!result.success || !result.videos || result.videos.length === 0) {
    return result;
  }
  
  const randomIndex = Math.floor(Math.random() * result.videos.length);
  const randomVideo = result.videos[randomIndex];
  
  return {
    success: true,
    video: randomVideo,
    mood: moodKey
  };
};

export default {
  searchMoodVideos,
  getVideoDetails,
  getRandomMoodVideo,
  clearCache,
  validateApiKey
};

