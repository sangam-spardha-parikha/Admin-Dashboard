import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, fetchProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Fetch user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await fetchProfile();
        setUser(userData);
      } catch (error) {
        console.error("Auth Error:", error);
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  // Handle login
  const handleLogin = async (userData) => {
    try {
      const data = await login(userData);
      setUser(data.user);
      // navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setUser(null);
    window.location.href = "/"
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
