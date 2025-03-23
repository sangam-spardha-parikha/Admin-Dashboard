import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

        // Remove token from cookies
        Cookies.remove("jwt");

        // Redirect to login page
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error.response?.data?.message || error.message);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
