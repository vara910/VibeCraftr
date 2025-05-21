import axios from "axios";

const SPOTIFY_BASE_URL = import.meta.env.VITE_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

class SpotifyService {
  constructor() {
    this.api = axios.create({
      baseURL: SPOTIFY_BASE_URL,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("spotify_access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getAuthUrl() {
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-library-read",
      "playlist-modify-public",
      "playlist-modify-private",
    ].join(" ");

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "token",
      redirect_uri: REDIRECT_URI,
      scope: scope,
      show_dialog: true,
    });

    return `${AUTH_URL}?${params.toString()}`;
  }

  moodToFeatures = {
    happy: {
      min_valence: 0.7,
      min_energy: 0.6,
      target_mode: 1,
    },
    sad: {
      max_valence: 0.4,
      max_energy: 0.4,
      target_mode: 0,
    },
    energetic: {
      min_energy: 0.8,
      min_tempo: 120,
      target_mode: 1,
    },
    relaxed: {
      max_energy: 0.4,
      max_tempo: 100,
      target_mode: 1,
    },
    focused: {
      target_energy: 0.5,
      max_speechiness: 0.1,
      target_instrumentalness: 0.5,
    },
    angry: {
      min_energy: 0.7,
      max_valence: 0.4,
      target_mode: 0,
    },
  };

  async getRecommendations(mood, limit = 20) {
    try {
      const features = this.moodToFeatures[mood.toLowerCase()];
      const response = await this.api.get("/recommendations", {
        params: {
          limit,
          ...features,
          market: "US",
        },
      });
      return response.data.tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: this.formatDuration(track.duration_ms),
        imageUrl: track.album.images[2]?.url,
        uri: track.uri,
      }));
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw error;
    }
  }

  async createPlaylist(userId, name, description, tracks) {
    try {
      const playlist = await this.api.post(`/users/${userId}/playlists`, {
        name,
        description,
        public: false,
      });

      await this.api.post(`/playlists/${playlist.data.id}/tracks`, {
        uris: tracks.map(track => track.uri),
      });

      return playlist.data;
    } catch (error) {
      console.error("Error creating playlist:", error);
      throw error;
    }
  }

  async getUserProfile() {
    try {
      const response = await this.api.get("/me");
      return response.data;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }

  formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  }

  static handleRedirect() {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        const parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});

    if (hash.access_token) {
      localStorage.setItem("spotify_access_token", hash.access_token);
      window.location.hash = "";
      return hash.access_token;
    }
    return null;
  }
}

export default new SpotifyService();
