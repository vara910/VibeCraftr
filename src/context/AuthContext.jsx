import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import spotifyService from "../services/spotifyService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for redirect result
        const token = spotifyService.handleRedirect();
        
        if (token) {
          // If we got a token, fetch user profile
          const userProfile = await spotifyService.getUserProfile();
          setUser(userProfile);
          navigate("/dashboard");
        }
      } catch (err) {
        setError(err.message);
        console.error("Auth Error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [navigate]);

  const login = () => {
    window.location.href = spotifyService.getAuthUrl();
  };

  const logout = () => {
    localStorage.removeItem("spotify_access_token");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
