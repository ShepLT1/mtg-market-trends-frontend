import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchCardsAPI = async ({ name, page = 1, limit = 50 } = {}) => {
  const params = { page, limit };
  if (name) params.name = name;

  const response = await api.get("/cards", { params });
  return response.data;
};

export const fetchCardNamesAPI = async ({ name, limit = 20 } = {}) => {
  const params = { name, limit };
  const response = await api.get("/cards/names", { params });
  return response.data;
}

// TODO: For card search, create endpoints and db query to get all card names (1 card per name i.e. filter out variants) where name contains value of search query (triggers after 1 second typing delay). Results displayed in dropdown. On selection, call fetchCardNames