import axios from "axios";

// Replace this with your backend API URL
const API_BASE_URL = "http://localhost:5000/api"; 

// Axios instance for cleaner requests
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch user profile data
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data; 
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export default api;
