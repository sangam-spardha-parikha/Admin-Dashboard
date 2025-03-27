import axios from "axios";
import api from "./api";

// staff

export const fetchUsers = async () => {
  try {
    const response = await api.get("/admin/admin", { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`/admin/admin/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/admin/admin/edit/${id}`, userData);
  return response.data;
};


export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/admin/delete/${id}`);
  return response.data;
};

