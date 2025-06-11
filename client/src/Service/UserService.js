import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1.0/admin";
const apiClient = axios.create({ baseURL: API_BASE_URL });

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export const addUser = async (user) => {
  try {
    const response = await apiClient.post("/register", user, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to add user: ${error.message}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};
