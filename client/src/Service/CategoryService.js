import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1.0/admin/categories";
const apiClient = axios.create({ baseURL: API_BASE_URL });

export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1.0/categories",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

export const addCategory = async (category) => {
  try {
    const response = await apiClient.post("", category, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to add category: ${error.message}`);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(`/${categoryId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
};
