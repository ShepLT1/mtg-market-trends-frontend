import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Fetch cards with optional filters
export const fetchCardsAPI = async ({ name, page = 1, limit = 50 } = {}) => {
  const params = { page, limit };
  if (name) params.name = name;

  const response = await api.get("/api/cards", { params });
  return response.data;
};
