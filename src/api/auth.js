import api from "./api";

// Login API
export const login = async (userData) => {
  const res = await api.post("/auth/login", userData , { withCredentials: true });
  return res.data;
};

// Logout API
export const logout = async () => {
  try {
    await api.post("/auth/logout");
    return true;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Profile API
export const fetchProfile = async () => {
  const res = await api.get("/user/profile/me");
  return res.data;
};

// Update Profile API
export const updateProfile = async (profileData) => {
  const res = await api.put("/user/profile/edit", profileData);
  return res.data;
};
