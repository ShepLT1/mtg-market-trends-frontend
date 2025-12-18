import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchListingsByPriceDiffAPI = async ({
  days = 1,
  limit = 10,
  order = "desc",
} = {}) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const params = {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    limit,
    order,
  };

  const response = await api.get("/listings", { params });
  return response.data;
};

