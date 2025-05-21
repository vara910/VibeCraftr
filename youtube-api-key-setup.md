# Getting a YouTube API Key for Mood Mixer

Follow these step-by-step instructions to obtain a YouTube API key and set up your application.

## 1. Sign in to Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. If you've never used Google Cloud before, you may need to accept the Terms of Service

## 2. Create a New Project

1. Click on the project dropdown at the top of the page
2. Click on "New Project" 
3. Enter a project name (e.g., "YouTube Mood Mixer")
4. Click "Create"
5. Wait for your project to be created (you'll see a notification)
6. Make sure your new project is selected in the project dropdown

## 3. Enable the YouTube Data API

1. In the left sidebar, navigate to "APIs & Services" > "Library"
2. In the search bar, type "YouTube Data API"
3. Click on "YouTube Data API v3" in the results
4. Click the "Enable" button
5. Wait for the API to be enabled

## 4. Create API Credentials

1. In the left sidebar, navigate to "APIs & Services" > "Credentials"
2. Click the "Create Credentials" button and select "API key"
3. Your new API key will be displayed in a popup
4. Click the "Restrict Key" button to set up restrictions (recommended)
5. Under "API restrictions," select "YouTube Data API v3"
6. Click "Save"

## 5. Update Your .env File

1. In your project directory, open the `.env` file
2. Replace the placeholder API key with your new key:

```
# YouTube API Configuration
VITE_YOUTUBE_API_KEY=YOUR_NEW_API_KEY_HERE
VITE_YOUTUBE_API_URL=https://www.googleapis.com/youtube/v3

# Environment type
VITE_NODE_ENV=development
```

3. Save the file
4. Restart your development server if it's running

## 6. API Quota Considerations

* YouTube Data API has a daily quota limit of 10,000 units
* Different API operations consume different amounts of quota
* Search operations consume 100 units per call
* Watch your quota usage in the Google Cloud Console under "APIs & Services" > "Dashboard"
* For a production application, consider implementing caching strategies to reduce API calls

## 7. Testing Your API Key

1. Run your application
2. Navigate to the Mood Player page
3. Select a mood and verify that videos load correctly
4. If you encounter any issues, check the browser console for error messages

## 8. Security Best Practices

* Never commit your API key to version control
* Consider using environment variables for deployment
* For production, enable HTTP referrer restrictions in Google Cloud Console
* Monitor your API usage regularly
* Rotate your API keys periodically for better security

Remember to keep your API key secure and never share it publicly!

