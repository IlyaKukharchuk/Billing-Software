import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1.0/admin/items";
const apiClient = axios.create({ baseURL: API_BASE_URL });

export const fetchItems = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1.0/items", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch items: ${error.message}`);
  }
};

export const addItem = async (item) => {
  try {
    const response = await apiClient.post("", item, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to add item: ${error.message}`);
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await apiClient.delete(`/${itemId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to delete item: ${error.message}`);
  }
};
