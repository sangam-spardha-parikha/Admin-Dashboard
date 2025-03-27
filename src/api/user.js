import axios from "axios";
import api from "./api";

// staff

export const fetchUsers = async () => {
  try {
    const response = await api.get("/stafs/staff", { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`/stafs/staff/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/stafs/staff/edit/${id}`, userData);
  return response.data;
};


export const deleteUser = async (id) => {
  const response = await api.delete(`/stafs/staff/delete/${id}`);
  return response.data;
};

// student

export const fetchStudents = async () => {
    try {
      const response = await api.get("/auth/students", { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };