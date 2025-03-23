import axios from "axios";
import api from "./api";

export const fetchUsers = async () => {
  try {
    const response = await api.get("/api/auth/users", { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchStudents = async () => {
    try {
      const response = await api.get("/auth/students", { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };