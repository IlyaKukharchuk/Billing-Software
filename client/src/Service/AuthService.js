import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:8080/api/v1.0";
const apiClient = axios.create({ baseURL: API_BASE_URL });

export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    if (response.status == 200) {
      toast.success("login is succesful");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    return response;
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
};
